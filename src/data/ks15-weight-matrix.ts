// KS-15 가중치 매트릭스 (3체질: 태음인, 소양인, 소음인)
export interface WeightMatrix {
  [questionId: number]: {
    [optionKey: string]: {
      male: [number, number, number];  // [태음인, 소양인, 소음인]
      female: [number, number, number];
      is_default?: boolean;
    };
  };
}

export const ks15WeightMatrix: WeightMatrix = {
  1: { // 2.성격
    "(1)Broad-m": { male: [1.621, -5.496, 1.444], female: [4.496, -9.484, 0.0], is_default: true },
    "(2)Moderat": { male: [0.0, 0.0, 0.0], female: [0.0, 0.0, 0.0] },
    "(3)Narrow-": { male: [0.0, 3.507, 0.0], female: [-3.576, 7.991, 0.0] },
  },
  2: { // 3.행동
    "(1)Quickly": { male: [-6.467, 0.0, 7.432], female: [0.0, -2.687, 3.946] },
    "(2)Moderat": { male: [2.521, 0.0, -2.97], female: [0.0, 0.0, -1.844], is_default: true },
    "(3)Slowly": { male: [2.829, 0.0, -3.087], female: [0.0, 1.342, -1.495] },
  },
  3: { // 4.일
    "(1) Active": { male: [0.0, -5.655, 3.969], female: [0.0, -7.163, 2.089] },
    "(2) Modera": { male: [0.0, 1.991, -1.521], female: [0.0, 2.829, 0.0] },
    "(3) Passiv": { male: [0.0, 3.04, -2.04], female: [0.0, 2.711, -1.746], is_default: true },
  },
  4: { // 5.성격
    "(1) Extrov": { male: [0.0, -3.274, 3.923], female: [0.0, -7.185, 4.404] },
    "(2) Modera": { male: [0.0, 0.0, 0.0], female: [0.0, 3.04, 0.0] },
    "(3) Introv": { male: [0.0, 2.829, -3.087], female: [0.0, 5.881, -5.836] },
    "(1) Mascul": { male: [2.113, -6.669, 1.419], female: [4.793, -7.32, 0.0] },
    "(3) Femini": { male: [0.0, 2.282, 0.0], female: [-3.437, 12.0, -2.426], is_default: true },
    "(1) Irrati": { male: [0.0, -1.77, 1.444], female: [0.0, -5.61, 2.758] },
    "(3) Ration": { male: [0.0, 0.0, -1.869], female: [0.0, 1.495, -1.795], is_default: true },
  },
  5: { // 8.소화
    "(1) Yes": { male: [1.721, -4.952, 1.596], female: [2.497, -5.474, 0.0] },
    "(2)No s di": { male: [-3.565, 8.435, -1.596], female: [-2.497, 7.539, 0.0], is_default: true },
    "(3)No c di": { male: [-1.721, 6.943, -1.596], female: [-3.839, 9.004, 0.0] },
  },
  6: { // 9.입맛
    "(1) Good": { male: [6.535, -8.747, 0.0], female: [5.056, -8.423, 0.0] },
    "(2) Averag": { male: [-4.975, 6.309, 0.0], female: [-4.838, 4.747, 0.0], is_default: true },
    "(3) Not go": { male: [-1.342, 1.342, 0.0], female: [0.0, 1.991, -1.342] },
  },
  7: { // 10.땀
    "(1) A lot": { male: [4.861, -4.587, 0.0], female: [8.259, -5.474, 0.0], is_default: true },
    "(2) Modera": { male: [0.0, 0.0, 0.0], female: [0.0, 0.0, 0.0] },
    "(3) A litt": { male: [-2.695, 4.493, 0.0], female: [-3.772, 5.043, 0.0] },
  },
  8: { // 11.땀후기분
    "(1) Refres": { male: [2.186, -3.669, 0.0], female: [6.714, -7.723, 0.0] },
    "(2) Tired": { male: [-4.997, 6.039, 0.0], female: [-2.592, 5.971, 0.0], is_default: true },
    "(3) No dif": { male: [0.0, 0.0, 0.0], female: [-1.596, 0.0, 0.0] },
  },
  9: { // 12.변참기힘듬
    "(1) Often": { male: [0.0, 0.0, 0.0], female: [0.0, -1.47, 0.0], is_default: true },
    "(2) Somtim": { male: [0.0, 0.0, 0.0], female: [0.0, 0.0, 2.354] },
    "(3) Never": { male: [0.0, 0.0, 0.0], female: [0.0, 2.426, -1.546] },
  },
  10: { // 13.밤 소변
    "(1) 0": { male: [0.0, 1.894, 0.0], female: [0.0, 0.0, 0.0] },
    "(2) 1": { male: [0.0, 0.0, 0.0], female: [0.0, 0.0, 0.0] },
    "(3) ≥ 2": { male: [0.0, -2.48, 0.0], female: [0.0, 0.0, 0.0], is_default: true },
  },
  11: { // 14.온도적응
    "(1) Cold": { male: [-6.129, 6.422, 0.0], female: [-1.546, 2.64, 0.0] },
    "(2) Heat": { male: [9.239, -7.655, 0.0], female: [3.599, -4.77, 0.0], is_default: true },
    "(3) Both n": { male: [0.0, 0.0, 0.0], female: [0.0, 0.0, 0.0] },
  },
  12: { // 15.음용수
    "(1) Hot wa": { male: [-1.967, 3.134, 0.0], female: [-3.064, 4.929, 0.0] },
    "(2) Cold w": { male: [0.0, -1.368, 0.0], female: [0.0, -1.869, 0.0] },
    "(3) Not sp": { male: [0.0, 0.0, 0.0], female: [0.0, -1.316, 0.0], is_default: true },
  },
};

// 체질 매핑 (KS-15는 3체질 시스템)
export const constitutionNames = {
  0: 'taeumin',      // 태음인 (M_1, F_1)
  1: 'soyangin',     // 소양인 (M_2, F_2)
  2: 'soeumin',      // 소음인 (M_3, F_3)
} as const;

export const constitutionKoreanNames = {
  taeumin: '태음인',
  soyangin: '소양인',
  soeumin: '소음인',
} as const;

export type ConstitutionType = keyof typeof constitutionKoreanNames;
