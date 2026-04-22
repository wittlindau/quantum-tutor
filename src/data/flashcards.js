// Flashcards: key definitions, theorems, and formulas for PHYS 50

export const FLASHCARDS = [
  // ===== MATHEMATICAL FORMALISM =====
  { id: 'f1', unit: 'II', category: 'definition',
    front: 'Dirac notation: what is a ket $|\\psi\\rangle$?',
    back: 'A ket is a vector in the Hilbert space $\\mathcal{H}$. It represents the quantum state of the system. The corresponding bra $\\langle\\psi|$ is the dual vector (Hermitian conjugate), and $\\langle\\phi|\\psi\\rangle$ is the inner product.' },
  { id: 'f2', unit: 'II', category: 'theorem',
    front: 'Spectral theorem for Hermitian operators',
    back: 'A Hermitian operator $\\hat{A} = \\hat{A}^\\dagger$ on a finite-dimensional Hilbert space (or a self-adjoint operator on a suitable infinite-dimensional space) has: (1) real eigenvalues, (2) eigenvectors forming a complete orthonormal basis (eigenbasis), (3) spectral decomposition $\\hat{A} = \\sum_i a_i |a_i\\rangle\\langle a_i|$.' },
  { id: 'f3', unit: 'II', category: 'formula',
    front: 'Completeness relation (resolution of identity)',
    back: '$\\sum_i |a_i\\rangle\\langle a_i| = \\hat{1}$ for a complete orthonormal set $\\{|a_i\\rangle\\}$. In position basis: $\\int dx\\, |x\\rangle\\langle x| = \\hat{1}$. This allows inserting "1" anywhere in a bracket.' },
  { id: 'f4', unit: 'II', category: 'formula',
    front: 'Commutator $[\\hat{x}, \\hat{p}]$',
    back: '$[\\hat{x}, \\hat{p}] = i\\hbar$ — the canonical commutation relation. This is the quantum version of the Poisson bracket $\\{x, p\\}_{\\text{PB}} = 1$. All of quantum dynamics follows from this single relation.' },
  // ===== POSTULATES =====
  { id: 'f5', unit: 'III', category: 'postulate',
    front: 'State postulate of QM',
    back: 'The state of a quantum system is completely described by a unit vector $|\\psi\\rangle$ in a complex Hilbert space $\\mathcal{H}$. Equivalently, by a density matrix $\\rho = |\\psi\\rangle\\langle\\psi|$ (or more generally $\\rho$ with $\\text{Tr}\\rho = 1$, $\\rho^\\dagger = \\rho$, $\\rho \\geq 0$).' },
  { id: 'f6', unit: 'III', category: 'postulate',
    front: 'Born rule',
    back: 'If the system is in state $|\\psi\\rangle$ and observable $\\hat{A}$ is measured, the probability of obtaining eigenvalue $a_i$ is $P(a_i) = |\\langle a_i|\\psi\\rangle|^2$. After measurement, the state collapses to $|a_i\\rangle$.' },
  { id: 'f7', unit: 'III', category: 'postulate',
    front: 'Time evolution postulate',
    back: 'The state evolves according to $i\\hbar \\frac{d}{dt}|\\psi(t)\\rangle = \\hat{H}|\\psi(t)\\rangle$. The formal solution is $|\\psi(t)\\rangle = e^{-i\\hat{H}t/\\hbar}|\\psi(0)\\rangle = \\hat{U}(t)|\\psi(0)\\rangle$, where $\\hat{U}$ is unitary.' },
  { id: 'f8', unit: 'III', category: 'postulate',
    front: 'Observables postulate',
    back: 'Physical observables correspond to Hermitian (self-adjoint) operators on $\\mathcal{H}$. The possible measurement outcomes are the eigenvalues, which are guaranteed to be real by Hermiticity.' },
  // ===== 1D POTENTIALS =====
  { id: 'f9', unit: 'IV', category: 'formula',
    front: 'Infinite square well: energy levels',
    back: '$E_n = \\frac{n^2\\pi^2\\hbar^2}{2mL^2}$, $n = 1, 2, 3, \\ldots$ with wavefunctions $\\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\!\\left(\\frac{n\\pi x}{L}\\right)$. Ground state ($n=1$) has non-zero energy — zero-point energy from the uncertainty principle.' },
  { id: 'f10', unit: 'IV', category: 'formula',
    front: 'Tunneling: qualitative result',
    back: 'For a particle with $E < V_0$ encountering a potential barrier of height $V_0$ and width $a$, the transmission probability is $T \\approx e^{-2\\kappa a}$ where $\\kappa = \\sqrt{2m(V_0 - E)}/\\hbar$. Tunneling is a purely quantum effect with no classical analogue.' },
  // ===== UNCERTAINTY =====
  { id: 'f11', unit: 'V', category: 'theorem',
    front: 'Robertson uncertainty relation',
    back: 'For any two observables $\\hat{A}$ and $\\hat{B}$: $\\sigma_A \\sigma_B \\geq \\frac{1}{2}|\\langle[\\hat{A},\\hat{B}]\\rangle|$. For position and momentum: $\\sigma_x \\sigma_p \\geq \\hbar/2$. Equality holds for coherent states (Gaussian wave packets).' },
  { id: 'f12', unit: 'V', category: 'theorem',
    front: 'Energy-time uncertainty',
    back: '$\\Delta E \\cdot \\Delta t \\geq \\hbar/2$, where $\\Delta t$ is the time scale over which the state changes appreciably. Note: $t$ is NOT an operator in QM — this relation has a different interpretation than position-momentum uncertainty.' },
  // ===== SHO =====
  { id: 'f13', unit: 'VII', category: 'formula',
    front: 'SHO energy spectrum',
    back: '$E_n = \\hbar\\omega(n + \\frac{1}{2})$, $n = 0, 1, 2, \\ldots$ Equally spaced levels with spacing $\\hbar\\omega$. Ground state energy $E_0 = \\frac{1}{2}\\hbar\\omega \\neq 0$ is the zero-point energy (forbidden by $\\sigma_x \\sigma_p \\geq \\hbar/2$).' },
  { id: 'f14', unit: 'VII', category: 'formula',
    front: 'Ladder operator relations',
    back: '$a|n\\rangle = \\sqrt{n}|n-1\\rangle$, $\\quad a^\\dagger|n\\rangle = \\sqrt{n+1}|n+1\\rangle$, $\\quad [a,a^\\dagger] = 1$, $\\quad \\hat{H} = \\hbar\\omega(a^\\dagger a + \\frac{1}{2})$. These completely determine the SHO spectrum without solving a differential equation.' },
  // ===== ANGULAR MOMENTUM =====
  { id: 'f15', unit: 'VIII', category: 'formula',
    front: 'Angular momentum commutation relations',
    back: '$[L_i, L_j] = i\\hbar\\epsilon_{ijk}L_k$, i.e. $[L_x,L_y]=i\\hbar L_z$ etc. $[L^2, L_i]=0$ for all $i$. These imply: can simultaneously know $L^2$ and one component (say $L_z$), but NOT two different components.' },
  { id: 'f16', unit: 'VIII', category: 'formula',
    front: 'Angular momentum spectrum',
    back: '$L^2|l,m\\rangle = \\hbar^2 l(l+1)|l,m\\rangle$, $L_z|l,m\\rangle = \\hbar m|l,m\\rangle$. Orbital: $l = 0,1,2,\\ldots$; $m = -l,\\ldots,+l$. Spin-1/2: $l=s=1/2$; $m = \\pm 1/2$ (half-integer, purely quantum, no classical analogue).' },
  // ===== HYDROGEN ATOM =====
  { id: 'f17', unit: 'IX', category: 'formula',
    front: 'Hydrogen energy levels',
    back: '$E_n = -\\frac{m_e e^4}{2\\hbar^2}\\frac{1}{n^2} = -\\frac{13.6\\text{ eV}}{n^2}$, $n = 1, 2, 3, \\ldots$ Degeneracy of level $n$: $g_n = n^2$ (from $l=0,\\ldots,n-1$ and $m=-l,\\ldots,l$). With spin: $2n^2$.' },
  { id: 'f18', unit: 'IX', category: 'formula',
    front: 'Hydrogen wavefunctions',
    back: '$\\psi_{nlm}(r,\\theta,\\phi) = R_{nl}(r)Y_l^m(\\theta,\\phi)$ where $R_{nl}$ involves associated Laguerre polynomials and $Y_l^m$ are spherical harmonics. Bohr radius: $a_0 = \\hbar^2/(m_e e^2) \\approx 0.529$ Å.' },
  // ===== SPIN =====
  { id: 'f19', unit: 'X', category: 'formula',
    front: 'Pauli matrices',
    back: '$\\sigma_x = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$, $\\sigma_y = \\begin{pmatrix}0&-i\\\\i&0\\end{pmatrix}$, $\\sigma_z = \\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$. Properties: $\\sigma_i^2 = I$, $[\\sigma_i,\\sigma_j] = 2i\\epsilon_{ijk}\\sigma_k$, $\\{\\sigma_i,\\sigma_j\\} = 2\\delta_{ij}I$. Spin operator: $\\hat{S}_i = \\frac{\\hbar}{2}\\sigma_i$.' },
  { id: 'f20', unit: 'X', category: 'concept',
    front: 'Bloch sphere representation',
    back: 'Every spin-1/2 state $|\\psi\\rangle = \\cos(\\theta/2)|+\\rangle + e^{i\\phi}\\sin(\\theta/2)|-\\rangle$ corresponds to a point on the unit sphere with polar angle $\\theta$ and azimuthal angle $\\phi$. The expectation value $\\langle\\hat{\\mathbf{S}}\\rangle = \\frac{\\hbar}{2}\\hat{n}$ where $\\hat{n} = (\\sin\\theta\\cos\\phi, \\sin\\theta\\sin\\phi, \\cos\\theta)$.' },
  // ===== PATH INTEGRALS =====
  { id: 'f21', unit: 'XI', category: 'formula',
    front: 'Feynman path integral',
    back: '$\\langle x_f, t_f | x_i, t_i \\rangle = \\int \\mathcal{D}[x(t)]\\, e^{iS[x]/\\hbar}$ where the integral is over all paths connecting $(x_i, t_i)$ to $(x_f, t_f)$. The classical path dominates when $S \\gg \\hbar$ (classical limit). Quantum corrections come from paths near the classical one.' },
  { id: 'f22', unit: 'XI', category: 'concept',
    front: 'Stationary phase approximation',
    back: 'In the path integral, paths far from the classical path contribute rapidly oscillating phases that cancel. The dominant contribution is from paths near $\\delta S = 0$ (the classical trajectory). This gives the WKB approximation in the semiclassical limit $\\hbar \\to 0$.' },
]

export const getFlashcardsForUnit = (unitId) => FLASHCARDS.filter(f => f.unit === unitId)
export const getAllFlashcards = () => FLASHCARDS
