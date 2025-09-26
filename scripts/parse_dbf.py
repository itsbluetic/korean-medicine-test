import struct
import json
import os

def read_dbf_records(filename):
    try:
        with open(filename, 'rb') as f:
            # Read header
            header = f.read(32)
            version, year, month, day, num_records, header_length, record_length = struct.unpack('<BBBBIHH', header[:12])

            # Read field descriptors
            f.seek(32)
            fields = []
            while True:
                field_desc = f.read(32)
                if field_desc[0] == 0x0D:  # Field descriptor terminator
                    break
                name = field_desc[:11].rstrip(b'\x00').decode('ascii', errors='ignore')
                field_type = chr(field_desc[11])
                length = field_desc[16]
                fields.append({'name': name if name else f'field_{len(fields)}', 'type': field_type, 'length': length})

            # Read records
            f.seek(header_length)
            records = []

            for i in range(num_records):
                record_data = f.read(record_length)
                if record_data[0] != 0x20:  # Skip deleted records
                    continue

                record = {}
                pos = 1  # Skip deletion marker

                for field in fields:
                    field_data = record_data[pos:pos + field['length']]

                    if field['type'] == 'C':  # Character
                        try:
                            value = field_data.rstrip(b'\x00 ').decode('cp949', errors='ignore')
                        except:
                            value = field_data.rstrip(b'\x00 ').decode('utf-8', errors='ignore')
                    elif field['type'] == 'N':  # Numeric
                        try:
                            value_str = field_data.rstrip(b'\x00 ').decode('ascii', errors='ignore')
                            value = float(value_str) if '.' in value_str else int(value_str) if value_str else 0
                        except:
                            value = 0
                    elif field['type'] == 'L':  # Logical
                        value = field_data[0] == ord('T') if field_data else False
                    elif field['type'] == 'D':  # Date
                        try:
                            date_str = field_data.decode('ascii', errors='ignore')
                            value = f"{date_str[:4]}-{date_str[4:6]}-{date_str[6:8]}" if len(date_str) == 8 else ""
                        except:
                            value = ""
                    else:
                        value = field_data

                    record[field['name']] = value
                    pos += field['length']

                records.append(record)

            return {
                'filename': filename,
                'records': num_records,
                'fields': fields,
                'data': records
            }

    except Exception as e:
        print(f'Error reading {filename}: {e}')
        return None

# Parse all DBF files
results = {}
dbf_files = [
    'reference/k_15_ss.DBF',
    'reference/k_15_wt.DBF',
    'reference/ks15.dbf',
    'reference/ks15_set.dbf'
]

for filename in dbf_files:
    if os.path.exists(filename):
        print(f"Parsing {filename}...")
        result = read_dbf_records(filename)
        if result:
            results[os.path.basename(filename)] = result
            print(f"  Records: {result['records']}")
            print(f"  Fields: {len(result['fields'])}")
            # Show first record
            if result['data']:
                print(f"  First record sample: {list(result['data'][0].items())[:3]}")
        print()

# Save to JSON
with open('reference/parsed-data.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Parsed data saved to reference/parsed-data.json")

# Show summary
print("\n=== SUMMARY ===")
for filename, data in results.items():
    print(f"{filename}: {data['records']} records, {len(data['fields'])} fields")