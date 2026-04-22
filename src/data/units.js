// Course structure mirroring P50LectureNotes.pdf exactly

export const UNITS = [
  {
    id: 'I',
    roman: 'I',
    title: 'Introduction',
    subtitle: 'Classical Mechanics & Quantization',
    color: '#f0b429',
    sections: [
      {
        id: 'I-A',
        title: 'Classical Mechanics Review',
        subsections: ['Euler-Lagrange equations', 'Hamilton\'s equations'],
      },
      {
        id: 'I-B',
        title: '(Bohr)-Wilson-Sommerfeld Quantization',
      },
    ],
  },
  {
    id: 'II',
    roman: 'II',
    title: 'Mathematical Formalism',
    subtitle: 'Linear Algebra & Hilbert Spaces',
    color: '#4a9eff',
    sections: [
      {
        id: 'II-A',
        title: 'Linear Algebra I: Vector Spaces',
        subsections: ['Vector space axioms', 'Inner product spaces', 'Resolution of unity'],
      },
      {
        id: 'II-B',
        title: 'Linear Algebra II: Linear Operators',
        subsections: ['Operators & adjoints', 'Eigenvectors & eigenvalues', 'Hermitian operators', 'Continuous spectra'],
      },
    ],
  },
  {
    id: 'III',
    roman: 'III',
    title: 'Principles of Quantum Mechanics',
    subtitle: 'The Postulates',
    color: '#00d4ff',
    sections: [
      {
        id: 'III-A',
        title: 'The Postulates of Quantum Mechanics',
        subsections: ['Elements of probability theory', 'Incompatible observables', 'Examples'],
      },
      {
        id: 'III-B',
        title: 'Momentum & Position Operators',
        subsections: ['Momentum as generator of translations', 'Matrix elements of p̂', 'Matrix elements of x̂'],
      },
      {
        id: 'III-C',
        title: 'Time-Independent Schrödinger Equation',
      },
    ],
  },
  {
    id: 'IV',
    roman: 'IV',
    title: 'Solutions of the Schrödinger Equation',
    subtitle: '1D Potentials',
    color: '#00e676',
    sections: [
      {
        id: 'IV-A',
        title: 'One-Dimensional Potentials',
        subsections: ['Free particle', 'Infinite square well', 'Boundary conditions', 'Finite square well', 'Dirac delta potential'],
      },
      {
        id: 'IV-B',
        title: 'One-Dimensional Theorems',
      },
    ],
  },
  {
    id: 'V',
    roman: 'V',
    title: 'Time Dependence',
    subtitle: 'Dynamics & Pictures',
    color: '#b388ff',
    sections: [
      {
        id: 'V-A',
        title: 'Evolution Operator',
        subsections: ['TDSE solution', 'Continuity equation'],
      },
      {
        id: 'V-B',
        title: 'Heisenberg & Schrödinger Pictures',
        subsections: ['Ehrenfest\'s theorem', 'Virial theorem', 'Base kets', 'Classical limit'],
      },
      {
        id: 'V-C',
        title: 'Uncertainty Principle',
        subsections: ['Generalized uncertainty principle', 'Energy-time uncertainty'],
      },
    ],
  },
  {
    id: 'VI',
    roman: 'VI',
    title: 'Frobenius-Fuchs Theory',
    subtitle: 'Series Solutions of ODEs',
    color: '#ffab40',
    sections: [
      { id: 'VI-A', title: 'Frobenius-Fuchs Method' },
    ],
  },
  {
    id: 'VII',
    roman: 'VII',
    title: 'The Simple Harmonic Oscillator',
    subtitle: 'Algebraic & Analytic Approaches',
    color: '#ff5252',
    sections: [
      {
        id: 'VII-A',
        title: 'Solving Schrödinger\'s Equation',
        subsections: ['Frobenius-Fuchs method', 'Normalization integral'],
      },
      {
        id: 'VII-B',
        title: 'Algebraic Solution',
        subsections: ['Raising & lowering operators', 'Time dependence'],
      },
      {
        id: 'VII-C',
        title: 'Schrödinger Wave Packet Solution',
      },
    ],
  },
  {
    id: 'VIII',
    roman: 'VIII',
    title: 'Three-Dimensional Quantum Mechanics',
    subtitle: 'Angular Momentum & Hydrogen',
    color: '#4a9eff',
    sections: [
      {
        id: 'VIII-A',
        title: 'Separation of Variables',
        subsections: ['Radial equation', 'Angular equation'],
      },
      { id: 'VIII-B', title: 'Algebraic Approach to Angular Momentum' },
      {
        id: 'VIII-C',
        title: 'The Hydrogen Atom',
        subsections: ['Two-body problem', 'Radial equation', 'Spectrum', 'Degeneracy'],
      },
      { id: 'VIII-D', title: 'Matrix Mechanics' },
    ],
  },
  {
    id: 'IX',
    roman: 'IX',
    title: 'Angular Momentum',
    subtitle: 'Spin, Rotations & Addition',
    color: '#00d4ff',
    sections: [
      { id: 'IX-A', title: 'Theory of Rotations' },
      {
        id: 'IX-B',
        title: 'Spin',
        subsections: ['Rotation operator & spin matrices', 'Spin in a magnetic field', 'Internal linear momentum'],
      },
      { id: 'IX-C', title: 'Addition of Angular Momenta' },
      {
        id: 'IX-D',
        title: 'Spin, Statistics & All That',
        subsections: ['Symmetrization requirement', 'Spin-statistics theorem'],
      },
    ],
  },
  {
    id: 'X',
    roman: 'X',
    title: 'Path-Integral Formulation',
    subtitle: 'Feynman\'s Approach',
    color: '#b388ff',
    sections: [
      { id: 'X-A', title: 'General Formalism' },
      { id: 'X-B', title: 'Classical Limit' },
      {
        id: 'X-C',
        title: 'Propagator in Elementary Cases',
        subsections: ['Free particles', 'SHO'],
      },
      { id: 'X-D', title: 'Momentum-Space Formulation' },
    ],
  },
  {
    id: 'XI',
    roman: 'XI',
    title: 'Relativistic Quantum Mechanics',
    subtitle: 'Klein-Gordon & Dirac Equations',
    color: '#ffab40',
    sections: [
      { id: 'XI-A', title: 'The Lorentz Group' },
      { id: 'XI-B', title: 'The Klein-Gordon Equation' },
      {
        id: 'XI-C',
        title: 'The Dirac Equation',
        subsections: ['Dirac Lagrangian', 'g-factor', 'Hydrogen spectrum'],
      },
    ],
  },
]

export const getUnit = (id) => UNITS.find(u => u.id === id)
