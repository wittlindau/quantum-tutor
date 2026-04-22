// Content blocks: type = 'text'|'equation'|'display'|'definition'|'theorem'|'example'|'note'|'warning'|'shankar'|'mcintyre'|'viz'
// Based on P50LectureNotes.pdf as primary source, Shankar and McIntyre as secondary

export const CONTENT = {

  // ============================================================
  // UNIT I: INTRODUCTION
  // ============================================================
  'I': {
    overview: `Classical mechanics provides three equivalent formulations — Newton, Euler-Lagrange, and Hamilton — each illuminating different aspects of dynamics. This unit reviews these formulations, then introduces the (Bohr)-Wilson-Sommerfeld quantization rules that historically bridged classical and quantum mechanics.`,
    sections: {
      'I-A': {
        title: 'Classical Mechanics Review',
        blocks: [
          { type: 'text', content: `There are three approaches to classical mechanics: Newton's laws, Euler-Lagrange equations, and Hamilton's equations (plus the Hamilton-Jacobi equation). The latter two are the most useful for quantum mechanics.` },
          { type: 'definition', title: 'Action Functional', content: `The action is a functional of a path $q(t)$:`, latex: `S[q] = \\int L(q, \\dot{q}, t)\\, dt` },
          { type: 'text', content: `Hamilton's principle states that the physical path satisfies $\\delta S = 0$ for fixed endpoints $\\delta q(t_1) = \\delta q(t_2) = 0$.` },
          { type: 'theorem', title: 'Euler-Lagrange Equations', content: `Applying $\\delta S = 0$ with fixed endpoints yields:`, latex: `\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}} = \\frac{\\partial L}{\\partial q}` },
          { type: 'note', content: `The Lagrangian is defined up to an additive total time derivative $\\frac{d}{dt}f(q,t)$, which does not affect the equations of motion.` },
          { type: 'definition', title: 'Canonical Momentum', content: `The generalized momentum conjugate to $q$ is:`, latex: `p = \\frac{\\partial L}{\\partial \\dot{q}}` },
          { type: 'text', content: `Momentum is the generator of spatial translations. Angular momentum is the generator of spatial rotations. Energy is the generator of time translations.` },
          { type: 'definition', title: 'Hamiltonian', content: `The Hamiltonian is the Legendre transform of the Lagrangian:`, latex: `H(p, q, t) = p\\dot{q} - L(q, \\dot{q}, t)` },
          { type: 'theorem', title: `Hamilton's Equations`, content: `From $dH = \\dot{q}\\,dp - \\dot{p}\\,dq - \\frac{\\partial L}{\\partial t}dt$:`, latex: `\\dot{q} = \\frac{\\partial H}{\\partial p}, \\qquad \\dot{p} = -\\frac{\\partial H}{\\partial q}` },
          { type: 'note', content: `For a time-independent Hamiltonian, $\\frac{dH}{dt} = \\frac{\\partial H}{\\partial t} = 0$, so energy is conserved.` },
          { type: 'example', title: 'Coulomb Hamiltonian', content: `For an electron in the Coulomb potential with $L = \\frac{1}{2}m(\\dot{r}^2 + r^2\\dot{\\theta}^2 + r^2\\sin^2\\theta\\,\\dot{\\phi}^2) + \\frac{e^2}{4\\pi\\epsilon_0 r}$, the canonical momenta are $p_r = m\\dot{r}$, $p_\\theta = mr^2\\dot{\\theta}$, $p_\\phi = mr^2\\sin^2\\theta\\,\\dot{\\phi}$, giving:`, latex: `H = \\frac{1}{2m}\\left(p_r^2 + \\frac{p_\\theta^2}{r^2} + \\frac{p_\\phi^2}{r^2\\sin^2\\theta}\\right) - \\frac{e^2}{4\\pi\\epsilon_0 r}` },
          { type: 'shankar', content: `Shankar Chapter 2 provides a thorough review. Key result: for a particle of mass $m$ and charge $q$ in an electromagnetic field, $H = \\frac{1}{2m}|\\mathbf{p} - \\frac{q}{c}\\mathbf{A}|^2 + q\\phi$.` },
        ],
        viz: 'lagrangian-path',
      },
      'I-B': {
        title: '(Bohr)-Wilson-Sommerfeld Quantization',
        blocks: [
          { type: 'text', content: `In 1913, Bohr proposed three postulates for atomic systems: existence of stationary states, the frequency rule $f = (E_2 - E_1)/h$, and quantization of angular momentum in multiples of $\\hbar$.` },
          { type: 'text', content: `In 1915–1916, Wilson and Sommerfeld independently generalized Bohr's quantization to conditionally periodic systems:` },
          { type: 'theorem', title: 'Wilson-Sommerfeld Quantization', content: `For each canonical coordinate $q_i$ and its conjugate momentum $p_i$:`, latex: `\\oint p_i\\, dq_i = n_i h, \\qquad n_i \\in \\mathbb{Z}_{>0}` },
          { type: 'example', title: '3D Particle in a Box', content: `For a box of dimensions $L_x \\times L_y \\times L_z$, applying the quantization rule to each direction gives $p_i = n_i h/(2L_i)$, so the energy is:`, latex: `E = \\frac{\\pi^2\\hbar^2}{2m}\\left[\\left(\\frac{n_x}{L_x}\\right)^2 + \\left(\\frac{n_y}{L_y}\\right)^2 + \\left(\\frac{n_z}{L_z}\\right)^2\\right]` },
          { type: 'example', title: '1D Simple Harmonic Oscillator', content: `For $H = \\frac{p^2}{2m} + \\frac{1}{2}m\\omega^2 x^2$, evaluating the contour integral $\\oint p\\,dx$ using the classical trajectory gives:`, latex: `E_n = (n + \\gamma)\\hbar\\omega` },
          { type: 'note', content: `The Wilson-Sommerfeld method cannot determine $\\gamma$. The full quantum treatment (Unit VII) gives $\\gamma = 1/2$ exactly — the famous zero-point energy.` },
          { type: 'warning', content: `The Wilson-Sommerfeld method fails for systems without clear periodic orbits. It is a semiclassical approximation that works well when quantum numbers are large (correspondence principle).` },
        ],
        viz: 'sommerfeld-orbits',
      },
    },
  },

  // ============================================================
  // UNIT II: MATHEMATICAL FORMALISM
  // ============================================================
  'II': {
    overview: `Quantum mechanics is formulated in the language of linear algebra over complex Hilbert spaces. This unit develops that mathematical framework from scratch — vector spaces, inner products, linear operators, eigenvalues — using Dirac's elegant bra-ket notation. Master this material and the rest of the course becomes transparent.`,
    sections: {
      'II-A': {
        title: 'Linear Algebra I: Vector Spaces',
        blocks: [
          { type: 'definition', title: 'Vector Space', content: `A vector space over $\\mathbb{C}$ is a set $V$ with vector addition and scalar multiplication satisfying eight axioms. The axioms ensure: associativity and commutativity of addition, existence of zero vector and additive inverses, and the two distributivity and associativity properties of scalar multiplication.` },
          { type: 'text', content: `The two most important vector spaces in QM:` },
          { type: 'display', latex: `V = \\mathbb{C}^n \\quad \\text{(finite-dimensional)}` },
          { type: 'display', latex: `V = L^2(\\mathbb{R}) = \\left\\{f: \\mathbb{R}\\to\\mathbb{C} \\,\\Big|\\, \\int_{\\mathbb{R}} |f(x)|^2\\,dx < \\infty\\right\\}` },
          { type: 'definition', title: 'Inner Product', content: `An inner product on $V$ is a function $\\langle\\cdot|\\cdot\\rangle: V\\times V \\to \\mathbb{C}$ satisfying:` },
          { type: 'display', latex: `\\begin{aligned} &1.\;\\langle u|v\\rangle = \\langle v|u\\rangle^* &\\text{(Hermitian symmetry)}\\\\ &2.\;\\langle w|\\alpha u + \\beta v\\rangle = \\alpha\\langle w|u\\rangle + \\beta\\langle w|v\\rangle &\\text{(linearity in 2nd arg)}\\\\ &3.\;\\langle v|v\\rangle \\geq 0, \\text{ with equality iff } |v\\rangle=0 &\\text{(positive definite)} \\end{aligned}` },
          { type: 'note', content: `Note: the inner product is **anti-linear** in the first argument: $\\langle \\alpha u|v\\rangle = \\alpha^*\\langle u|v\\rangle$. Physicists use this convention; mathematicians use the opposite.` },
          { type: 'theorem', title: 'Cauchy-Schwarz Inequality', content: `For any $|u\\rangle, |v\\rangle \\in V$:`, latex: `|\\langle u|v\\rangle| \\leq \\|u\\|\\,\\|v\\|` },
          { type: 'definition', title: 'Dirac Bra-Ket Notation', content: `A ket $|v\\rangle \\in V$ is a column vector. A bra $\\langle v| \\in V^*$ is its dual (row vector). Their inner product is $\\langle u|v\\rangle \\in \\mathbb{C}$. This notation was introduced by P.A.M. Dirac in 1939 to unify the abstract and coordinate-space descriptions of QM.` },
          { type: 'definition', title: 'Orthonormal Basis', content: `A set $\\{|e_n\\rangle\\}$ is an orthonormal (ON) basis if:`, latex: `\\langle e_m | e_n \\rangle = \\delta_{mn}` },
          { type: 'theorem', title: 'Resolution of Unity (Completeness)', content: `For an ON basis $\\{|e_n\\rangle\\}$ of a Hilbert space:`, latex: `\\sum_n |e_n\\rangle\\langle e_n| = \\hat{I} \\qquad \\text{(discrete)}` },
          { type: 'display', latex: `\\int |\\xi\\rangle\\langle \\xi|\\,d\\xi = \\hat{I} \\qquad \\text{(continuous)}` },
          { type: 'text', content: `This is the single most-used identity in QM computations. It allows you to insert a complete set of states anywhere.` },
          { type: 'definition', title: 'Hilbert Space', content: `A Hilbert space $\\mathcal{H}$ is a complete inner product space. Completeness means every Cauchy sequence converges to an element of $\\mathcal{H}$. The relevant Hilbert spaces in QM are $\\mathbb{C}^n$ and $L^2(\\mathbb{R})$.` },
          { type: 'shankar', content: `Shankar Ch. 1 is the definitive reference. He emphasizes that the key insight is recognizing that diverse mathematical objects (column vectors, functions, matrices) all share the same abstract vector space structure.` },
        ],
      },
      'II-B': {
        title: 'Linear Algebra II: Linear Operators',
        blocks: [
          { type: 'definition', title: 'Linear Operator', content: `A linear operator $T: V \\to V$ satisfies $T(\\alpha|u\\rangle + \\beta|v\\rangle) = \\alpha T|u\\rangle + \\beta T|v\\rangle$. Using the resolution of unity, any operator can be written in a basis:`, latex: `T = \\hat{I}T\\hat{I} = \\sum_{m,n} |e_m\\rangle\\langle e_m|T|e_n\\rangle\\langle e_n| = \\sum_{m,n} T_{mn}\\,|e_m\\rangle\\langle e_n|` },
          { type: 'definition', title: 'Adjoint', content: `The adjoint $T^\\dagger$ of an operator $T$ is defined by:`, latex: `\\langle u|T^\\dagger|v\\rangle = \\langle v|T|u\\rangle^*` },
          { type: 'text', content: `Key properties: $(AB)^\\dagger = B^\\dagger A^\\dagger$, $(cT)^\\dagger = c^*T^\\dagger$, $(T^\\dagger)^\\dagger = T$.` },
          { type: 'definition', title: 'Hermitian (Self-Adjoint) Operator', content: `An operator $A$ is Hermitian if $A = A^\\dagger$, i.e., $\\langle u|A|v\\rangle = \\langle v|A|u\\rangle^*$. **Observables in QM are represented by Hermitian operators.**` },
          { type: 'theorem', title: 'Properties of Hermitian Operators', content: `If $A = A^\\dagger$, then:` },
          { type: 'display', latex: `\\begin{aligned} &\\text{1. Eigenvalues of } A \\text{ are real.} \\\\ &\\text{2. Eigenvectors with distinct eigenvalues are orthogonal.} \\\\ &\\text{3. There exists an ON eigenbasis (spectral theorem).} \\end{aligned}` },
          { type: 'text', content: `**Proof (eigenvalues real):** Let $A|v\\rangle = \\lambda|v\\rangle$. Then $\\langle v|A|v\\rangle = \\lambda\\langle v|v\\rangle$. But also $\\langle v|A|v\\rangle = \\langle v|A^\\dagger|v\\rangle^* = \\langle v|A|v\\rangle^* = \\lambda^*\\langle v|v\\rangle$. Since $\\langle v|v\\rangle > 0$, we get $\\lambda = \\lambda^*$, so $\\lambda \\in \\mathbb{R}$.` },
          { type: 'definition', title: 'Unitary Operator', content: `An operator $U$ is unitary if $U^\\dagger U = UU^\\dagger = \\hat{I}$. Unitary operators preserve inner products: $\\langle Uu|Uv\\rangle = \\langle u|v\\rangle$.` },
          { type: 'definition', title: 'Commutator', content: `The commutator of two operators is $[A, B] \\equiv AB - BA$.` },
          { type: 'theorem', title: 'Simultaneous Diagonalizability', content: `Two diagonalizable operators $A$ and $B$ are simultaneously diagonalizable if and only if $[A, B] = 0$.` },
          { type: 'definition', title: 'Projection Operator', content: `An operator $P$ satisfying $P^2 = P$ is a projection. For a normalized eigenvector $|v\\rangle$, $P_v = |v\\rangle\\langle v|$ is the projector onto the eigenspace. $P_v|\\psi\\rangle = \\langle v|\\psi\\rangle|v\\rangle$.` },
          { type: 'definition', title: 'Operators with Continuous Spectra', content: `When the spectrum is continuous, the eigenvalue equation is $A|a\\rangle = a|a\\rangle$ with $\\langle a'|a\\rangle = \\delta(a'-a)$. The resolution of unity becomes $\\int |a\\rangle\\langle a|\\,da = \\hat{I}$, and the expansion of a state is:`, latex: `|\\psi\\rangle = \\int |a\\rangle\\langle a|\\psi\\rangle\\,da` },
          { type: 'mcintyre', content: `McIntyre Ch. 2 introduces operators through the concrete example of spin-1/2, showing how the abstract formalism manifests in 2×2 matrix form before generalizing.` },
        ],
      },
    },
  },

  // ============================================================
  // UNIT III: PRINCIPLES OF QUANTUM MECHANICS
  // ============================================================
  'III': {
    overview: `The four postulates of QM provide the fundamental bridge between the mathematical formalism and physical predictions. Together they specify: what a quantum state is, what observables are, how measurement works (Born rule), and how states evolve in time.`,
    sections: {
      'III-A': {
        title: 'The Postulates of Quantum Mechanics',
        blocks: [
          { type: 'text', content: `The following postulates are universally agreed upon. The lecture notes follow Shankar's formulation.` },
          { type: 'definition', title: 'Postulate 1: State Space', content: `The state of a quantum system at time $t$ is specified by a normalized ket $|\\psi(t)\\rangle$ in a Hilbert space $\\mathcal{H}$: $\\langle\\psi|\\psi\\rangle = 1$. (The state is actually a **ray** — $e^{i\\theta}|\\psi\\rangle$ is physically equivalent to $|\\psi\\rangle$.)` },
          { type: 'definition', title: 'Postulate 2: Observables', content: `Physical observables correspond to self-adjoint (Hermitian) operators $\\hat{A} = \\hat{A}^\\dagger$. Classical variables $x, p$ are promoted to operators via **first quantization**, with the canonical commutation relation:`, latex: `[\\hat{x}, \\hat{p}] = i\\hbar` },
          { type: 'definition', title: 'Postulate 3: Measurement (Born Rule)', content: `A measurement of observable $\\hat{A}$ yields one of its eigenvalues $a_i$. The probability of obtaining $a_i$ is:`, latex: `P(a_i) = \\langle\\psi|P_{a_i}|\\psi\\rangle = |\\langle a_i|\\psi\\rangle|^2 \\quad \\text{(non-degenerate)}` },
          { type: 'text', content: `After measurement yielding $a_i$, the state **collapses** to the normalized projected state: $|\\psi'\\rangle = P_{a_i}|\\psi\\rangle / \\sqrt{\\langle\\psi|P_{a_i}|\\psi\\rangle}$.` },
          { type: 'definition', title: 'Postulate 4: Schrödinger Equation', content: `The state vector evolves according to:`, latex: `i\\hbar\\frac{d}{dt}|\\psi(t)\\rangle = \\hat{H}|\\psi(t)\\rangle` },
          { type: 'text', content: `where $\\hat{H}$ is the Hamiltonian operator, constructed from the classical Hamiltonian by first quantization.` },
          { type: 'definition', title: 'Expectation Value', content: `The expectation value of observable $\\hat{A}$ in state $|\\psi\\rangle$:`, latex: `\\langle\\hat{A}\\rangle = \\langle\\psi|\\hat{A}|\\psi\\rangle = \\sum_i a_i P(a_i)` },
          { type: 'definition', title: 'Variance', content: `The variance (spread of measurements):`, latex: `\\sigma^2_{\\hat{A}} = \\langle(\\hat{A} - \\langle\\hat{A}\\rangle)^2\\rangle = \\langle\\hat{A}^2\\rangle - \\langle\\hat{A}\\rangle^2` },
          { type: 'example', title: 'Spin-1/2 Measurement', content: `State $|\\psi\\rangle = |z,+\\rangle = \\binom{1}{0}$. Eigenstates of $\\sigma_x$: $|x,\\pm\\rangle = \\frac{1}{\\sqrt{2}}\\binom{1}{\\pm 1}$. Then:`, latex: `P(s_x = +\\tfrac{\\hbar}{2}) = |\\langle x,+|z,+\\rangle|^2 = \\frac{1}{2}, \\quad P(s_x = -\\tfrac{\\hbar}{2}) = \\frac{1}{2}` },
          { type: 'definition', title: 'Incompatible Observables', content: `Two observables are **compatible** if $[\\hat{A},\\hat{B}]=0$ (they share an eigenbasis and can be simultaneously measured). They are **incompatible** if $[\\hat{A},\\hat{B}]\\neq 0$ — no state simultaneously has definite values of both. The canonical example: $[\\hat{x},\\hat{p}]=i\\hbar\\neq 0$.` },
          { type: 'shankar', content: `Shankar Ch. 4 is the gold standard for understanding the postulates. His discussion of "why Hilbert space" is particularly enlightening — quantum mechanics needs complex numbers because a state of definite momentum ($e^{ipx/\\hbar}$) cannot be a real function with $|\\psi|^2$ uniform (Karam 2020).` },
          { type: 'mcintyre', content: `McIntyre builds up the postulates entirely from Stern-Gerlach experiments, making them feel physically inevitable rather than mathematically imposed. Recommended for intuition.` },
        ],
        viz: 'bloch-sphere',
      },
      'III-B': {
        title: 'Momentum & Position Operators',
        blocks: [
          { type: 'text', content: `Momentum is the generator of spatial translations. This fundamental fact — not an assumption — determines the form of $\\hat{p}$ in position space.` },
          { type: 'theorem', title: 'Momentum Operator in Position Space', content: `Since momentum generates translations, in the position basis $\\{|x\\rangle\\}$:`, latex: `\\hat{p} = -i\\hbar\\frac{d}{dx}` },
          { type: 'theorem', title: 'Position Operator in Momentum Space', content: `Similarly, position generates momentum-space translations:`, latex: `\\hat{x} = i\\hbar\\frac{d}{dp}` },
          { type: 'text', content: `In the position basis, a state $|\\psi\\rangle$ is represented by its wave function $\\psi(x) = \\langle x|\\psi\\rangle$. The action of $\\hat{p}$ becomes:`, },
          { type: 'display', latex: `\\langle x|\\hat{p}|\\psi\\rangle = -i\\hbar\\frac{d\\psi(x)}{dx}` },
          { type: 'text', content: `The position and momentum representations are related by the Fourier transform:`, },
          { type: 'display', latex: `\\phi(p) = \\langle p|\\psi\\rangle = \\frac{1}{\\sqrt{2\\pi\\hbar}}\\int_{-\\infty}^\\infty e^{-ipx/\\hbar}\\psi(x)\\,dx` },
          { type: 'definition', title: 'Canonical Commutation Relation', content: `The fundamental commutation relation of QM:`, latex: `[\\hat{x}, \\hat{p}] = i\\hbar` },
          { type: 'text', content: `This can be verified directly: $[\\hat{x},\\hat{p}]\\psi(x) = x(-i\\hbar\\psi') - (-i\\hbar)(x\\psi)' = x(-i\\hbar\\psi') + i\\hbar\\psi + i\\hbar x\\psi' = i\\hbar\\psi$.` },
        ],
      },
      'III-C': {
        title: 'Time-Independent Schrödinger Equation',
        blocks: [
          { type: 'text', content: `For a time-independent Hamiltonian, we can separate variables: $|\\psi(t)\\rangle = e^{-iEt/\\hbar}|E\\rangle$.` },
          { type: 'theorem', title: 'Time-Independent Schrödinger Equation (TISE)', content: `The energy eigenvalue problem:`, latex: `\\hat{H}|E\\rangle = E|E\\rangle` },
          { type: 'text', content: `In position space with $\\hat{H} = \\frac{\\hat{p}^2}{2m} + V(\\hat{x})$:`, },
          { type: 'display', latex: `-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2} + V(x)\\psi(x) = E\\psi(x)` },
          { type: 'text', content: `The general time-dependent solution is a superposition of stationary states:`, },
          { type: 'display', latex: `\\Psi(x,t) = \\sum_n c_n \\psi_n(x)\\,e^{-iE_n t/\\hbar}, \\quad c_n = \\langle E_n|\\psi(0)\\rangle` },
          { type: 'note', content: `Stationary states have time-independent probability distributions: $|\\Psi(x,t)|^2 = |\\psi_n(x)|^2$ — hence the name.` },
        ],
      },
    },
  },

  // ============================================================
  // UNIT IV: SOLUTIONS OF SCHRÖDINGER EQUATION
  // ============================================================
  'IV': {
    overview: `We now solve the TISE for paradigmatic 1D potentials. These solutions exhibit the key quantum phenomena: quantization of energy, tunneling, zero-point energy, and probability current.`,
    sections: {
      'IV-A': {
        title: 'One-Dimensional Potentials',
        blocks: [
          { type: 'definition', title: 'Free Particle ($V=0$)', content: `The TISE gives $-\\frac{\\hbar^2}{2m}\\psi'' = E\\psi$. With $k = \\sqrt{2mE}/\\hbar$:`, latex: `\\psi_k(x) = \\frac{1}{\\sqrt{2\\pi}}e^{ikx}, \\qquad E = \\frac{\\hbar^2 k^2}{2m}` },
          { type: 'note', content: `Free-particle eigenstates are **not** in $L^2(\\mathbb{R})$ — they are not normalizable. They are Dirac-orthonormal: $\\langle k'|k\\rangle = \\delta(k'-k)$. Physical states are wave packets formed by superposition.` },
          { type: 'definition', title: 'Infinite Square Well', content: `$V(x) = 0$ for $0<x<L$, $\\infty$ otherwise. Boundary conditions $\\psi(0)=\\psi(L)=0$ quantize the wave vector: $k_n = n\\pi/L$, $n\\in\\mathbb{N}$. The normalized solutions are:`, latex: `\\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\frac{n\\pi x}{L}, \\qquad E_n = \\frac{\\hbar^2\\pi^2}{2mL^2}n^2` },
          { type: 'note', content: `The ground state ($n=1$) has energy $E_1 = \\frac{\\hbar^2\\pi^2}{2mL^2} > 0$. This **zero-point energy** is a consequence of the uncertainty principle: confining a particle forces $\\Delta p > 0$.` },
          { type: 'theorem', title: 'Boundary Conditions on $\\psi$', content: `For a potential with a finite jump discontinuity, both $\\psi$ and $\\psi'$ are continuous. For a delta function potential, $\\psi$ is continuous but $\\psi'$ has a jump discontinuity. For an infinite potential wall, $\\psi$ vanishes at the wall.` },
          { type: 'definition', title: 'Finite Square Well', content: `$V = V_0$ for $|x| > a$, $0$ inside. For bound states $0 < E < V_0$, define $k = \\sqrt{2mE}/\\hbar$, $q = \\sqrt{2m(V_0-E)}/\\hbar$. The even-parity condition and the transcendental equation:`, latex: `\\xi\\tan\\xi = \\eta, \\qquad \\xi^2 + \\eta^2 = \\frac{2mV_0 a^2}{\\hbar^2}` },
          { type: 'text', content: `where $\\xi = ka$, $\\eta = qa$. Solutions are intersections of the circle $\\xi^2+\\eta^2 = K^2$ with $\\eta = \\xi\\tan\\xi$ (even) or $\\eta = -\\xi\\cot\\xi$ (odd).` },
          { type: 'definition', title: 'Dirac Delta Potential', content: `$V(x) = -g\\delta(x)$, $g > 0$. There is exactly one bound state with:`, latex: `\\psi(x) = \\sqrt{\\frac{mg}{\\hbar^2}}\\,e^{-mg|x|/\\hbar^2}, \\qquad E = -\\frac{mg^2}{2\\hbar^2}` },
          { type: 'text', content: `For scattering states ($E > 0$) with $\\beta = mg/(\\hbar^2 k)$, the reflection and transmission coefficients are:`, },
          { type: 'display', latex: `R = \\frac{\\beta^2}{1+\\beta^2}, \\qquad T = \\frac{1}{1+\\beta^2}, \\qquad R+T=1` },
          { type: 'shankar', content: `Shankar Ch. 5 works all these examples in detail. His treatment of the double-slit experiment (§5.5) is a must-read for understanding why $|\\psi|^2$ is the probability density.` },
          { type: 'heading', text: 'Quantum Tunneling', anchor: 'quantum-tunneling' },
          { type: 'text', content: `For a rectangular barrier of height $V_0$ and width $d$, the exact transmission coefficient for $E < V_0$ is:` },
          { type: 'display', latex: `T = \\frac{1}{1 + \\frac{V_0^2\\sinh^2(\\kappa d)}{4E(V_0-E)}}, \\qquad \\kappa = \\frac{\\sqrt{2m(V_0-E)}}{\\hbar}` },
          { type: 'text', content: `For $\\kappa d \\gg 1$ (thick barrier), $\\sinh(\\kappa d) \\approx \\frac{1}{2}e^{\\kappa d}$, giving the WKB result $T \\approx 16\\frac{E}{V_0}(1-\\frac{E}{V_0})e^{-2\\kappa d}$. The exponential sensitivity to $\\kappa d$ makes tunneling extremely sensitive to barrier width — the basis for STM and nuclear decay rates.` },
          { type: 'viz', id: 'tunneling' },
        ],
        viz: 'wavefunctions',
      },
      'IV-B': {
        title: 'One-Dimensional Theorems',
        blocks: [
          { type: 'theorem', title: 'Non-Degeneracy of Bound States', content: `Bound states in 1D are non-degenerate.` },
          { type: 'text', content: `**Proof:** Suppose $\\psi_1, \\psi_2$ have the same energy. Then $\\psi_1''\\psi_2 - \\psi_2''\\psi_1 = 0$, so $(\\psi_1'\\psi_2 - \\psi_2'\\psi_1)' = 0$, giving $W[\\psi_1,\\psi_2] = C$. But since bound states vanish at $\\pm\\infty$, $C=0$, so $\\psi_1 \\propto \\psi_2$.` },
          { type: 'theorem', title: 'No Nodes in Ground State', content: `The ground state wave function has no nodes (zeros in the interior of the domain).` },
          { type: 'theorem', title: 'Energy Bounds', content: `For any normalized state and Hamiltonian $\\hat{H} = \\hat{p}^2/(2m) + V$:` },
          { type: 'display', latex: `E \\geq V_{\\min}, \\qquad E > V(\\pm\\infty) \\text{ (for bound states)}` },
        ],
      },
    },
  },

  // ============================================================
  // UNIT V: TIME DEPENDENCE
  // ============================================================
  'V': {
    overview: `Having solved the TISE, we now treat time-dependent problems fully. The evolution operator, Heisenberg picture, Ehrenfest's theorem, and the uncertainty principle emerge from treating time dynamics carefully.`,
    sections: {
      'V-A': {
        title: 'Evolution Operator',
        blocks: [
          { type: 'theorem', title: 'Evolution Operator', content: `For a time-independent Hamiltonian, the formal solution to the TDSE is:`, latex: `|\\psi(t)\\rangle = U(t,t_0)|\\psi(t_0)\\rangle, \\qquad U(t,t_0) = e^{-i\\hat{H}(t-t_0)/\\hbar}` },
          { type: 'text', content: `$U$ is **unitary**: $U^\\dagger U = I$, which preserves normalization. In the energy eigenbasis $\\{|n\\rangle\\}$:` },
          { type: 'display', latex: `|\\psi(t)\\rangle = \\sum_n e^{-iE_n(t-t_0)/\\hbar}\\,c_n(t_0)\\,|n\\rangle` },
          { type: 'text', content: `Probability is conserved: $\\sum_n |c_n(t)|^2 = \\sum_n |c_n(0)|^2 = 1$.` },
          { type: 'definition', title: 'Probability Current', content: `The probability density $\\rho = |\\Psi|^2$ satisfies the continuity equation $\\partial_t \\rho + \\nabla\\cdot\\mathbf{J} = 0$ with probability current:`, latex: `\\mathbf{J} = \\frac{\\hbar}{m}\\,\\text{Im}[\\Psi^*\\nabla\\Psi] = \\frac{i\\hbar}{2m}(\\Psi\\nabla\\Psi^* - \\Psi^*\\nabla\\Psi)` },
          { type: 'definition', title: 'Reflection & Transmission Coefficients', content: `$R = J_R/J_I$, $T = J_T/J_I$, with $R + T = 1$ (conservation of probability).` },
          { type: 'heading', text: 'Wave Packet Time Evolution', anchor: 'wave-packet-evolution' },
          { type: 'text', content: `A general state $|\\psi(t)\\rangle = \\sum_n c_n e^{-iE_n t/\\hbar}|n\\rangle$ is a superposition of stationary states, each with its own phase. The packet spreads and interferes. For the ISW, there is a **quantum revival** at $T_{\\text{rev}} = 2mL^2/(\\pi\\hbar)$ when all phases realign and the packet reconstructs.` },
          { type: 'viz', id: 'wave-packet' },
        ],
      },
      'V-B': {
        title: 'Heisenberg & Schrödinger Pictures',
        blocks: [
          { type: 'text', content: `The Schrödinger picture: states evolve, operators are fixed. The Heisenberg picture: states are fixed, operators evolve. Both are equivalent descriptions.` },
          { type: 'definition', title: 'Heisenberg Picture Operator', content: `An operator $A_H(t)$ in the Heisenberg picture is related to the Schrödinger picture by:`, latex: `A_H(t) = U^\\dagger(t) A_S U(t)` },
          { type: 'theorem', title: 'Heisenberg Equation of Motion', content: `Operators in the Heisenberg picture obey:`, latex: `\\frac{dA_H}{dt} = \\frac{i}{\\hbar}[H, A_H] + \\left(\\frac{\\partial A_S}{\\partial t}\\right)_H` },
          { type: 'theorem', title: `Ehrenfest's Theorem`, content: `The expectation values of position and momentum obey Newton's equations:`, latex: `m\\frac{d\\langle x\\rangle}{dt} = \\langle p\\rangle, \\qquad \\frac{d\\langle p\\rangle}{dt} = -\\left\\langle\\frac{\\partial V}{\\partial x}\\right\\rangle` },
          { type: 'note', content: `Ehrenfest's theorem says quantum mechanics reduces to classical mechanics for expectation values — but note $\\langle -\\partial V/\\partial x\\rangle \\neq -\\partial V/\\partial\\langle x\\rangle$ in general. True classical behavior only holds when the wave packet is narrow compared to the scale of variation of $V$.` },
          { type: 'theorem', title: 'Virial Theorem', content: `For a stationary state of a potential $V(x) \\propto x^n$:`, latex: `2\\langle T\\rangle = n\\langle V\\rangle` },
        ],
      },
      'V-C': {
        title: 'Uncertainty Principle',
        blocks: [
          { type: 'theorem', title: 'Generalized Uncertainty Principle', content: `For any two Hermitian operators $A$ and $B$:`, latex: `\\sigma_A\\,\\sigma_B \\geq \\frac{1}{2}|\\langle[A,B]\\rangle|` },
          { type: 'text', content: `**Proof sketch:** Define $|f\\rangle = (A - \\langle A\\rangle)|\\psi\\rangle$, $|g\\rangle = (B - \\langle B\\rangle)|\\psi\\rangle$. By Cauchy-Schwarz: $\\langle f|f\\rangle\\langle g|g\\rangle \\geq |\\langle f|g\\rangle|^2$. Splitting $\\langle f|g\\rangle$ into real and imaginary parts gives the result.` },
          { type: 'theorem', title: 'Heisenberg Uncertainty Principle', content: `From $[\\hat{x},\\hat{p}] = i\\hbar$:`, latex: `\\sigma_x\\,\\sigma_p \\geq \\frac{\\hbar}{2}` },
          { type: 'theorem', title: 'Energy-Time Uncertainty', content: `For the time $\\Delta t$ for a significant change in a system:`, latex: `\\Delta E\\,\\Delta t \\geq \\frac{\\hbar}{2}` },
          { type: 'note', content: `The energy-time uncertainty is conceptually different from $\\sigma_x\\sigma_p \\geq \\hbar/2$: time is not an operator in QM, so $\\Delta t$ requires a separate definition. Here $\\Delta t \\equiv \\sigma_A/(|d\\langle A\\rangle/dt|)$ is the characteristic time for the state to evolve appreciably.` },
        ],
        viz: 'uncertainty',
      },
    },
  },

  // ============================================================
  // UNIT VII: SIMPLE HARMONIC OSCILLATOR
  // ============================================================
  'VII': {
    overview: `The SHO is arguably the most important system in all of physics: every system near stable equilibrium is approximately a harmonic oscillator (Taylor expansion of $V$). It appears throughout QM, QFT, and beyond. Two approaches: analytic (Hermite polynomials) and algebraic (ladder operators).`,
    sections: {
      'VII-A': {
        title: `Solving Schrödinger's Equation`,
        blocks: [
          { type: 'text', content: `The SHO potential is $V(x) = \\frac{1}{2}m\\omega^2 x^2$. Define natural units: $x_0 = \\sqrt{\\hbar/(m\\omega)}$ and $V_0 = \\frac{1}{2}\\hbar\\omega$. The dimensionless position is $y = x/x_0$.` },
          { type: 'text', content: `In these units, Schrödinger's equation becomes $\\psi'' - (y^2 - 2\\epsilon)\\psi = 0$ where $\\epsilon = E/(\\hbar\\omega)$. The asymptotic behavior $\\psi \\sim e^{-y^2/2}$ motivates the Ansatz $\\psi(y) = e^{-y^2/2}f(y)$, leading to Hermite's ODE: $f'' - 2yf' + (2\\epsilon-1)f = 0$.` },
          { type: 'theorem', title: 'Energy Spectrum (Analytic)', content: `The series terminates (giving normalizable solutions) only when $2\\epsilon - 1 = 2n$, $n\\in\\mathbb{Z}_{\\geq 0}$. Thus:`, latex: `E_n = \\left(n + \\frac{1}{2}\\right)\\hbar\\omega, \\qquad n = 0, 1, 2, \\ldots` },
          { type: 'theorem', title: 'SHO Eigenfunctions', content: `The normalized energy eigenfunctions are:`, latex: `\\psi_n(x) = \\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4} \\frac{1}{\\sqrt{2^n n!}}\\,e^{-x^2/(2x_0^2)}\\,H_n\\!\\left(\\frac{x}{x_0}\\right)` },
          { type: 'text', content: `where $H_n$ are Hermite polynomials: $H_0=1$, $H_1=2y$, $H_2=4y^2-2$, $H_3=8y^3-12y$, generated by $e^{-s^2+2st} = \\sum_n \\frac{H_n(t)}{n!}s^n$.` },
        ],
        viz: 'sho-wavefunctions',
      },
      'VII-B': {
        title: 'Algebraic Solution',
        blocks: [
          { type: 'text', content: `The algebraic method reveals the deep structure of the SHO without solving any differential equation.` },
          { type: 'definition', title: 'Raising & Lowering Operators', content: `Define:`, latex: `a = \\sqrt{\\frac{m\\omega}{2\\hbar}}\\left(x + \\frac{ip}{m\\omega}\\right), \\qquad a^\\dagger = \\sqrt{\\frac{m\\omega}{2\\hbar}}\\left(x - \\frac{ip}{m\\omega}\\right)` },
          { type: 'theorem', title: 'Algebra of Ladder Operators', content: `The key commutation relation and Hamiltonian:`, latex: `[a, a^\\dagger] = 1, \\qquad \\hat{H} = \\hbar\\omega\\left(a^\\dagger a + \\frac{1}{2}\\right) = \\hbar\\omega\\left(\\hat{N} + \\frac{1}{2}\\right)` },
          { type: 'theorem', title: 'Action on Number States', content: `The number operator $\\hat{N} = a^\\dagger a$ has eigenstates $|n\\rangle$ with eigenvalue $n\\geq 0$:`, latex: `a^\\dagger|n\\rangle = \\sqrt{n+1}\\,|n+1\\rangle, \\qquad a|n\\rangle = \\sqrt{n}\\,|n-1\\rangle, \\qquad a|0\\rangle = 0` },
          { type: 'text', content: `All states are built from the ground state: $|n\\rangle = \\frac{(a^\\dagger)^n}{\\sqrt{n!}}|0\\rangle$.` },
          { type: 'theorem', title: 'Position & Momentum Matrix Elements', content: `From $\\hat{x} = \\sqrt{\\frac{\\hbar}{2m\\omega}}(a+a^\\dagger)$ and $\\hat{p} = i\\sqrt{\\frac{m\\hbar\\omega}{2}}(a^\\dagger - a)$:`, latex: `\\langle n'|\\hat{x}|n\\rangle = \\sqrt{\\frac{\\hbar}{2m\\omega}}\\left(\\sqrt{n}\\,\\delta_{n',n-1} + \\sqrt{n+1}\\,\\delta_{n',n+1}\\right)` },
          { type: 'note', content: `Shankar (Ch. 7) emphasizes that any system with Hamiltonian $H = \\frac{1}{2}(P^2 + Q^2)$ (in appropriate units) has the SHO spectrum. This is why the SHO appears everywhere: normal modes, phonons, photons, quantum fields.` },
          { type: 'heading', text: 'Energy Level Diagrams', anchor: 'energy-level-diagrams' },
          { type: 'text', content: `Click any energy level below to visualize the corresponding eigenfunction $\\psi_n$ and probability density $|\\psi_n|^2$.` },
          { type: 'viz', id: 'energy-levels' },
        ],
      },
      'VII-C': {
        title: 'Schrödinger Wave Packet Solution',
        blocks: [
          { type: 'text', content: `A coherent state (Schrödinger wave packet) is the quantum state that most closely resembles a classical oscillator. It is an eigenstate of the lowering operator: $a|\\alpha\\rangle = \\alpha|\\alpha\\rangle$, $\\alpha \\in \\mathbb{C}$.` },
          { type: 'display', latex: `|\\alpha\\rangle = e^{-|\\alpha|^2/2}\\sum_{n=0}^\\infty \\frac{\\alpha^n}{\\sqrt{n!}}|n\\rangle` },
          { type: 'text', content: `Under time evolution, $|\\alpha(t)\\rangle = |\\alpha e^{-i\\omega t}\\rangle$ — the coherent state remains a coherent state with the classical oscillation frequency. The probability density is a Gaussian that oscillates without spreading.` },
        ],
        viz: 'sho-wavefunctions',
      },
    },
  },

  // ============================================================
  // UNIT VIII: 3D QUANTUM MECHANICS
  // ============================================================
  'VIII': {
    overview: `Moving to 3D, we encounter angular momentum as a key quantum number, spherical harmonics as basis functions, and the hydrogen atom as the paradigmatic exactly-solvable system.`,
    sections: {
      'VIII-A': {
        title: 'Separation of Variables',
        blocks: [
          { type: 'text', content: `For a spherically symmetric potential $V = V(r)$, the 3D TISE separates in spherical coordinates: $\\psi(r,\\theta,\\phi) = R(r)Y_l^m(\\theta,\\phi)$.` },
          { type: 'heading', text: 'Angular Momentum Operators', anchor: 'angular-momentum-operators' },
          { type: 'definition', title: 'Orbital Angular Momentum', content: `The orbital angular momentum operator is defined as $\\hat{\\mathbf{L}} = \\hat{\\mathbf{r}} \\times \\hat{\\mathbf{p}}$, with components:`, latex: `\\hat{L}_x = \\hat{y}\\hat{p}_z - \\hat{z}\\hat{p}_y, \\qquad \\hat{L}_y = \\hat{z}\\hat{p}_x - \\hat{x}\\hat{p}_z, \\qquad \\hat{L}_z = \\hat{x}\\hat{p}_y - \\hat{y}\\hat{p}_x` },
          { type: 'text', content: `These are **Hermitian** operators. In spherical coordinates $(r,\\theta,\\phi)$, the components take the form:` },
          { type: 'display', latex: `\\hat{L}_z = -i\\hbar\\frac{\\partial}{\\partial\\phi}` },
          { type: 'display', latex: `\\hat{L}^2 = -\\hbar^2\\left[\\frac{1}{\\sin\\theta}\\frac{\\partial}{\\partial\\theta}\\left(\\sin\\theta\\frac{\\partial}{\\partial\\theta}\\right) + \\frac{1}{\\sin^2\\theta}\\frac{\\partial^2}{\\partial\\phi^2}\\right]` },
          { type: 'theorem', title: 'Angular Momentum Commutation Relations', content: `The components satisfy the characteristic algebra (a consequence of $[r_i, p_j] = i\\hbar\\delta_{ij}$):`, latex: `[\\hat{L}_i, \\hat{L}_j] = i\\hbar\\epsilon_{ijk}\\hat{L}_k, \\qquad [\\hat{L}^2, \\hat{L}_i] = 0` },
          { type: 'note', content: `The commutation relation $[\\hat{L}^2, \\hat{L}_z] = 0$ means $L^2$ and $L_z$ can be simultaneously measured. But $[\\hat{L}_x, \\hat{L}_y] = i\\hbar \\hat{L}_z \\neq 0$, so no two *components* of $\\mathbf{L}$ can be simultaneously definite.` },
          { type: 'heading', text: 'Spherical Harmonics', anchor: 'spherical-harmonics' },
          { type: 'definition', title: 'Spherical Harmonics', content: `The simultaneous eigenfunctions of $\\hat{L}^2$ and $\\hat{L}_z$ are the spherical harmonics $Y_l^m(\\theta,\\phi)$:`, latex: `\\hat{L}^2 Y_l^m = \\hbar^2 l(l+1)Y_l^m, \\qquad \\hat{L}_z Y_l^m = m\\hbar Y_l^m` },
          { type: 'display', latex: `l = 0,1,2,\\ldots; \\qquad m = -l, -l+1, \\ldots, l` },
          { type: 'text', content: `Explicitly for the lowest values:` },
          { type: 'display', latex: `Y_0^0 = \\frac{1}{\\sqrt{4\\pi}}, \\quad Y_1^0 = \\sqrt{\\frac{3}{4\\pi}}\\cos\\theta, \\quad Y_1^{\\pm 1} = \\mp\\sqrt{\\frac{3}{8\\pi}}\\sin\\theta\\,e^{\\pm i\\phi}` },
          { type: 'display', latex: `Y_2^0 = \\sqrt{\\frac{5}{16\\pi}}(3\\cos^2\\theta-1), \\quad Y_2^{\\pm 1} = \\mp\\sqrt{\\frac{15}{8\\pi}}\\sin\\theta\\cos\\theta\\,e^{\\pm i\\phi}, \\quad Y_2^{\\pm 2} = \\sqrt{\\frac{15}{32\\pi}}\\sin^2\\theta\\,e^{\\pm 2i\\phi}` },
          { type: 'text', content: `The spherical harmonics form a complete orthonormal basis on the unit sphere: $\\int (Y_l^m)^*Y_{l'}^{m'}\\,d\\Omega = \\delta_{ll'}\\delta_{mm'}$.` },
          { type: 'definition', title: 'Radial Equation', content: `The radial function $u(r) = rR(r)$ satisfies an effective 1D Schrödinger equation:`, latex: `-\\frac{\\hbar^2}{2m}\\frac{d^2u}{dr^2} + \\underbrace{\\left[V(r) + \\frac{\\hbar^2 l(l+1)}{2mr^2}\\right]}_{V_{\\text{eff}}}u = Eu` },
        ],
      },
      'VIII-C': {
        title: 'The Hydrogen Atom',
        blocks: [
          { type: 'text', content: `For hydrogen, $V(r) = -e^2/(4\\pi\\epsilon_0 r)$. After separating the two-body problem into CM + relative motion, the relative motion satisfies the radial equation with this Coulomb potential.` },
          { type: 'theorem', title: 'Hydrogen Energy Spectrum', content: `The bound state energies depend only on $n$:`, latex: `E_n = -\\frac{m_e e^4}{2(4\\pi\\epsilon_0)^2\\hbar^2}\\frac{1}{n^2} = -\\frac{13.6\\,\\text{eV}}{n^2}, \\quad n = 1, 2, 3, \\ldots` },
          { type: 'definition', title: 'Quantum Numbers', content: `Each state is labeled by $|n,l,m\\rangle$ where:` },
          { type: 'display', latex: `n = 1,2,\\ldots; \\quad l = 0,1,\\ldots,n-1; \\quad m = -l,\\ldots,l` },
          { type: 'theorem', title: 'Degeneracy', content: `The energy $E_n$ is $n^2$-fold degenerate (ignoring spin; $2n^2$ with spin):`, latex: `\\sum_{l=0}^{n-1}(2l+1) = n^2` },
          { type: 'text', content: `This "accidental" degeneracy in $l$ arises from a hidden SO(4) symmetry of the Coulomb potential, related to the Laplace-Runge-Lenz vector. It is discussed further in Shankar and is responsible for the simplicity of hydrogen's spectrum.` },
          { type: 'definition', title: 'Radial Wave Functions', content: `$R_{nl}(r) = -\\sqrt{(2/na_0)^3 (n-l-1)!/(2n[(n+l)!]^3)}\\, e^{-r/(na_0)}(2r/na_0)^l L_{n-l-1}^{2l+1}(2r/na_0)$ where $a_0 = \\hbar^2/(m_e e^2/(4\\pi\\epsilon_0)) \\approx 0.529\\,\\AA$ is the Bohr radius.` },
          { type: 'shankar', content: `Shankar Ch. 13 gives the full derivation including the elegant factorization method. His Ch. 15 connects to the addition theorem for spherical harmonics.` },
        ],
        viz: 'hydrogen-orbitals',
      },
    },
  },

  // ============================================================
  // UNIT IX: ANGULAR MOMENTUM
  // ============================================================
  'IX': {
    overview: `Angular momentum is the central organizing principle of 3D QM. The algebraic approach — using commutation relations alone — reveals that half-integer spin is possible, leading to the discovery of electron spin.`,
    sections: {
      'IX-B': {
        title: 'Spin',
        blocks: [
          { type: 'text', content: `Spin is intrinsic angular momentum with no classical analog. For spin-1/2 particles, $s = 1/2$, $m_s = \\pm 1/2$. The spin operators are $\\hat{S}_i = \\frac{\\hbar}{2}\\sigma_i$ where $\\sigma_i$ are the Pauli matrices.` },
          { type: 'definition', title: 'Pauli Matrices', content: ``, latex: `\\sigma_x = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix},\\quad \\sigma_y = \\begin{pmatrix}0&-i\\\\i&0\\end{pmatrix},\\quad \\sigma_z = \\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}` },
          { type: 'theorem', title: 'Pauli Algebra', content: `From Assignment 1, Problem 1:`, latex: `\\sigma_a\\sigma_b = \\delta_{ab}I + i\\epsilon_{abc}\\sigma_c` },
          { type: 'display', latex: `[\\sigma_a, \\sigma_b] = 2i\\epsilon_{abc}\\sigma_c, \\qquad \\{\\sigma_a, \\sigma_b\\} = 2\\delta_{ab}I` },
          { type: 'definition', title: 'Spin-1/2 Eigenstates', content: `Eigenstates of $\\hat{S}_z$: $|+\\rangle = \\binom{1}{0}$, $|-\\rangle = \\binom{0}{1}$. For a general direction $\\hat{n} = (\\sin\\theta\\cos\\phi, \\sin\\theta\\sin\\phi, \\cos\\theta)$:`, latex: `|+;\\hat{n}\\rangle = \\cos\\frac{\\theta}{2}|+\\rangle + e^{i\\phi}\\sin\\frac{\\theta}{2}|-\\rangle` },
          { type: 'definition', title: 'Spin in a Magnetic Field', content: `The Hamiltonian for a spin-1/2 particle in field $\\mathbf{B} = B\\hat{z}$ is $H = -\\boldsymbol{\\mu}\\cdot\\mathbf{B} = \\frac{g_s e}{2m_e}\\hat{S}_z B = \\omega_0 \\hat{S}_z$ where $\\omega_0 = eB/(m_e)$. The spin precesses about $\\hat{z}$ at the Larmor frequency $\\omega_0$. This is the Bloch sphere picture.` },
          { type: 'mcintyre', content: `McIntyre Ch. 1–3 builds all of spin-1/2 formalism from Stern-Gerlach experiments. The Bloch sphere visualization is introduced in Ch. 3 and is the key geometric picture for spin precession.` },
          { type: 'heading', text: 'Spin Precession Animation', anchor: 'spin-precession-animation' },
          { type: 'text', content: `For $\\hat{H} = \\omega_0 \\hat{S}_z$, the time evolution is $|\\psi(t)\\rangle = e^{-i\\omega_0 S_z t/\\hbar}|\\psi(0)\\rangle$, which rotates the Bloch vector about $\\hat{z}$ at the Larmor frequency. The spin expectation values are:` },
          { type: 'display', latex: `\\langle S_x\\rangle = \\frac{\\hbar}{2}\\sin\\theta\\cos(\\phi_0 - \\omega_0 t), \\quad \\langle S_y\\rangle = \\frac{\\hbar}{2}\\sin\\theta\\sin(\\phi_0 - \\omega_0 t), \\quad \\langle S_z\\rangle = \\frac{\\hbar}{2}\\cos\\theta` },
          { type: 'viz', id: 'spin-precession' },
        ],
        viz: 'bloch-sphere',
      },
      'IX-A': {
        title: 'Theory of Rotations',
        blocks: [
          { type: 'text', content: `Angular momentum is not just a quantity that is conserved when there is rotational symmetry — it is the **generator** of rotations. This fundamental connection between symmetries and conserved quantities is an instance of Noether's theorem, and it determines the form of all angular momentum operators.` },
          { type: 'heading', text: 'Rotations in Quantum Mechanics', anchor: 'rotations-qm' },
          { type: 'definition', title: 'Rotation Operator', content: `A rotation by angle $\\phi$ about axis $\\hat{n}$ is implemented by the unitary operator:`, latex: `\\hat{R}(\\hat{n},\\phi) = e^{-i\\phi\\,\\hat{\\mathbf{n}}\\cdot\\hat{\\mathbf{J}}/\\hbar}` },
          { type: 'text', content: `This defines angular momentum: $\\hat{J}$ is *whatever operator appears here*. For orbital angular momentum, $\\hat{\\mathbf{J}} = \\hat{\\mathbf{L}} = \\hat{\\mathbf{r}}\\times\\hat{\\mathbf{p}}$. For spin-1/2, $\\hat{\\mathbf{J}} = \\hat{\\mathbf{S}} = \\frac{\\hbar}{2}\\boldsymbol{\\sigma}$.` },
          { type: 'theorem', title: 'Angular Momentum Algebra', content: `The defining commutation relations of angular momentum (a consequence of the group structure of rotations, specifically $R_x R_y \\neq R_y R_x$ for rotations in 3D):`, latex: `[\\hat{J}_i, \\hat{J}_j] = i\\hbar\\epsilon_{ijk}\\hat{J}_k` },
          { type: 'text', content: `These three commutation relations, together with the requirement that $\\hat{J}$ is Hermitian, completely determine the algebra. The eigenvalue spectrum follows from the algebra alone — no differential equations needed.` },
          { type: 'heading', text: 'Spectrum from the Algebra', anchor: 'spectrum-algebra' },
          { type: 'theorem', title: 'Eigenvalue Spectrum', content: `Defining $\\hat{J}^2 = J_x^2 + J_y^2 + J_z^2$, which commutes with all $J_i$, the simultaneous eigenvalues are:`, latex: `\\hat{J}^2|j,m\\rangle = \\hbar^2 j(j+1)|j,m\\rangle, \\qquad \\hat{J}_z|j,m\\rangle = m\\hbar|j,m\\rangle` },
          { type: 'display', latex: `j = 0,\\; \\tfrac{1}{2},\\; 1,\\; \\tfrac{3}{2},\\; \\ldots; \\qquad m = -j, -j+1, \\ldots, j` },
          { type: 'theorem', title: 'Ladder Operators', content: `$J_\\pm = J_x \\pm iJ_y$ satisfy $[J_z, J_\\pm] = \\pm\\hbar J_\\pm$ and act as:`, latex: `J_\\pm|j,m\\rangle = \\hbar\\sqrt{j(j+1)-m(m\\pm 1)}\\,|j,m\\pm 1\\rangle` },
          { type: 'note', content: `Half-integer $j$ is allowed by the algebra but requires the state to be a **spinor** rather than a single-valued function of $\\theta, \\phi$. Orbital angular momentum $\\hat{L} = \\hat{r}\\times\\hat{p}$ in position space gives only integer $l$ (single-valuedness of $\\psi$), but the abstract angular momentum algebra allows spin with $j = 1/2, 3/2, \\ldots$ — predicting particles with intrinsic spin.` },
          { type: 'heading', text: 'Wigner D-Matrices', anchor: 'wigner-d' },
          { type: 'definition', title: 'Wigner D-Matrix', content: `The matrix representing a rotation in the $|j,m\\rangle$ basis is the Wigner D-matrix:`, latex: `D^{(j)}_{m'm}(\\hat{n},\\phi) = \\langle j,m'|e^{-i\\phi\\hat{n}\\cdot\\hat{J}/\\hbar}|j,m\\rangle` },
          { type: 'example', title: 'Spin-1/2 Rotation', content: `For $j=1/2$ and rotation about $\\hat{z}$ by $\\phi$: $D^{(1/2)} = e^{-i\\phi\\sigma_z/2} = \\begin{pmatrix}e^{-i\\phi/2}&0\\\\0&e^{i\\phi/2}\\end{pmatrix}$. Under $\\phi = 2\\pi$: $D^{(1/2)} = -I$. A spin-1/2 state needs a **$4\\pi$ rotation** to return to itself.` },
          { type: 'shankar', content: `Shankar Ch. 12 derives the angular momentum algebra from the rotation group and proves that $j = 0, 1/2, 1, 3/2, \\ldots$ are all allowed. The key insight: QM requires representations of $\\text{SU}(2)$ (the universal cover of $\\text{SO}(3)$), not just $\\text{SO}(3)$ itself. $\\text{SU}(2)$ has both integer and half-integer representations.` },
        ],
      },
      'IX-C': {
        title: 'Addition of Angular Momenta',
        blocks: [
          { type: 'text', content: `When a system has two angular momenta (e.g., orbital $\\hat{L}$ and spin $\\hat{S}$, or two spins), we must combine them into a total angular momentum $\\hat{J} = \\hat{J}_1 + \\hat{J}_2$. There are two natural bases for the combined $((2j_1+1)(2j_2+1))$-dimensional space.` },
          { type: 'definition', title: 'Two Bases for the Coupled Space', content: `The **uncoupled basis**: $|j_1,m_1\\rangle|j_2,m_2\\rangle$ — simultaneous eigenstates of $J_1^2, J_{1z}, J_2^2, J_{2z}$. The **coupled basis**: $|j,m;j_1,j_2\\rangle$ — simultaneous eigenstates of $J^2, J_z, J_1^2, J_2^2$.` },
          { type: 'theorem', title: 'Clebsch-Gordan Decomposition', content: `When combining angular momenta $j_1$ and $j_2$, the combined Hilbert space decomposes as a **direct sum** of irreducible representations:`, latex: `\\mathcal{H}_{j_1}\\otimes\\mathcal{H}_{j_2} = \\bigoplus_{j=|j_1-j_2|}^{j_1+j_2}\\mathcal{H}_j` },
          { type: 'text', content: `In terms of dimensions: $(2j_1+1)(2j_2+1) = \\sum_{j=|j_1-j_2|}^{j_1+j_2}(2j+1)$. The total $m = m_1 + m_2$ is always conserved (since $J_z = J_{1z} + J_{2z}$ means $[J_z, J_{1z}] = 0$, and the uncoupled and coupled bases share the same $m$ eigenvalue).` },
          { type: 'heading', text: 'Clebsch-Gordan Coefficients', anchor: 'cg-coefficients' },
          { type: 'definition', title: 'Clebsch-Gordan Coefficients', content: `The unitary transformation between bases is given by CG coefficients $\\langle j_1,m_1;j_2,m_2|j,m\\rangle$:`, latex: `|j,m\\rangle = \\sum_{m_1+m_2=m}\\langle j_1,m_1;j_2,m_2|j,m\\rangle\\,|j_1,m_1\\rangle|j_2,m_2\\rangle` },
          { type: 'note', content: `CG coefficients vanish unless $m = m_1 + m_2$ (conservation of $J_z$) and $|j_1-j_2| \\leq j \\leq j_1+j_2$ (triangle rule). They are real by convention (Condon-Shortley phase).` },
          { type: 'heading', text: 'Key Example: Two Spin-½ Particles', anchor: 'two-spins' },
          { type: 'example', title: '$\\frac{1}{2}\\otimes\\frac{1}{2}$ Decomposition', content: `The four states $|\\pm\\frac{1}{2}\\rangle_1|\\pm\\frac{1}{2}\\rangle_2$ decompose into a **triplet** ($j=1$, $m=-1,0,1$) plus a **singlet** ($j=0$, $m=0$):` },
          { type: 'display', latex: `|1,1\\rangle = |{+}\\rangle|{+}\\rangle` },
          { type: 'display', latex: `|1,0\\rangle = \\frac{1}{\\sqrt{2}}\\left(|{+}\\rangle|{-}\\rangle + |{-}\\rangle|{+}\\rangle\\right)` },
          { type: 'display', latex: `|1,-1\\rangle = |{-}\\rangle|{-}\\rangle` },
          { type: 'display', latex: `|0,0\\rangle = \\frac{1}{\\sqrt{2}}\\left(|{+}\\rangle|{-}\\rangle - |{-}\\rangle|{+}\\rangle\\right)` },
          { type: 'text', content: `The triplet states are **symmetric** under interchange of the two spins; the singlet is **antisymmetric**. The singlet $|0,0\\rangle$ is a maximally entangled state — a Bell state.` },
          { type: 'note', content: `To find the $|1,0\\rangle$ state: apply $J_- = J_{1-} + J_{2-}$ to $|1,1\\rangle = |{+}\\rangle|{+}\\rangle$. Since $J_-|1,1\\rangle = \\hbar\\sqrt{2}|1,0\\rangle$ and $(J_{1-}+J_{2-})|{+}\\rangle|{+}\\rangle = \\hbar(|{-}\\rangle|{+}\\rangle + |{+}\\rangle|{-}\\rangle)$, we get $|1,0\\rangle = (|{-}\\rangle|{+}\\rangle + |{+}\\rangle|{-}\\rangle)/\\sqrt{2}$. The singlet is then orthogonal to this.` },
          { type: 'heading', text: 'Spin-Orbit Coupling', anchor: 'spin-orbit' },
          { type: 'example', title: '$l\\otimes\\frac{1}{2}$ (Orbital + Spin)', content: `Combining orbital $l$ with spin $s=1/2$ gives total $j = l+\\frac{1}{2}$ or $j = l-\\frac{1}{2}$ (for $l>0$). In the coupled basis, $\\hat{\\mathbf{L}}\\cdot\\hat{\\mathbf{S}} = \\frac{1}{2}(J^2 - L^2 - S^2)$ is diagonal:`, latex: `\\langle \\hat{\\mathbf{L}}\\cdot\\hat{\\mathbf{S}}\\rangle = \\frac{\\hbar^2}{2}\\left[j(j+1) - l(l+1) - \\frac{3}{4}\\right]` },
          { type: 'text', content: `This is the key identity for computing spin-orbit energies: for $j = l+\\frac{1}{2}$, $\\langle L\\cdot S\\rangle = \\frac{l\\hbar^2}{2}$; for $j = l-\\frac{1}{2}$, $\\langle L\\cdot S\\rangle = -\\frac{(l+1)\\hbar^2}{2}$.` },
          { type: 'shankar', content: `Shankar Ch. 15–16 covers addition of angular momenta and CG coefficients in detail. Tables of CG coefficients appear in Appendix A. The key method is the lowering-operator algorithm used above, which generates all CG coefficients from the highest-weight state.` },
        ],
      },
    },
  },

  // ============================================================
  // UNIT X: PATH INTEGRALS
  // ============================================================
  'X': {
    overview: `Feynman's path integral formulation provides a third complete formulation of QM (alongside Schrödinger and Heisenberg). It expresses quantum amplitudes as sums over all possible classical paths — giving deep geometric insight into the classical limit and connecting QM to QFT.`,
    sections: {
      'X-A': {
        title: 'General Formalism',
        blocks: [
          { type: 'theorem', title: 'Path Integral (Feynman)', content: `The propagator (amplitude to go from $x_i, t_i$ to $x_f, t_f$) is:`, latex: `\\langle x_f, t_f | x_i, t_i\\rangle = \\int \\mathcal{D}[x(t)]\\,e^{iS[x]/\\hbar}` },
          { type: 'text', content: `where $\\mathcal{D}[x(t)]$ denotes integration over all paths from $x_i$ to $x_f$, and $S[x] = \\int_{t_i}^{t_f} L(x,\\dot{x},t)\\,dt$ is the classical action.` },
          { type: 'note', content: `Each path contributes a phase $e^{iS/\\hbar}$ of equal magnitude. Paths near the classical path (where $\\delta S = 0$) interfere constructively; others cancel. This is the path-integral origin of the principle of least action.` },
          { type: 'theorem', title: 'Free-Particle Propagator', content: `For $V=0$:`, latex: `K(x_f, t_f; x_i, t_i) = \\sqrt{\\frac{m}{2\\pi i\\hbar T}}\\exp\\left[\\frac{im(x_f-x_i)^2}{2\\hbar T}\\right], \\quad T = t_f - t_i` },
          { type: 'shankar', content: `Shankar Ch. 8 derives the path integral from the time-slicing procedure and computes the SHO propagator exactly. He emphasizes the path integral as a Euclidean functional integral when $t \\to -i\\tau$, connecting to statistical mechanics.` },
        ],
      },
      'X-B': {
        title: 'Classical Limit',
        blocks: [
          { type: 'text', content: `In the limit $\\hbar\\to 0$, the integral is dominated by paths of stationary phase — paths where $\\delta S = 0$, i.e., **classical paths**. This is the quantum-to-classical transition via the method of stationary phase.` },
          { type: 'display', latex: `\\lim_{\\hbar\\to 0}\\int\\mathcal{D}[x]\\,e^{iS/\\hbar} \\longrightarrow e^{iS_{\\text{cl}}/\\hbar}` },
        ],
      },
    },
  },

  // ============================================================
  // UNIT XI: RELATIVISTIC QM
  // ============================================================
  'XI': {
    overview: `Combining quantum mechanics with special relativity leads to the Klein-Gordon equation (for spin-0) and the Dirac equation (for spin-1/2). The Dirac equation predicted antimatter and explained the electron's g-factor.`,
    sections: {
      'XI-B': {
        title: 'The Klein-Gordon Equation',
        blocks: [
          { type: 'text', content: `The relativistic energy-momentum relation $E^2 = (pc)^2 + (m_0 c^2)^2$ suggests replacing $E \\to i\\hbar\\partial_t$, $\\mathbf{p} \\to -i\\hbar\\nabla$:` },
          { type: 'display', latex: `\\left(\\Box + \\frac{m_0^2 c^2}{\\hbar^2}\\right)\\phi = 0, \\quad \\Box = \\frac{1}{c^2}\\partial_t^2 - \\nabla^2` },
          { type: 'note', content: `The Klein-Gordon equation has a problem: the probability density $\\rho = \\frac{i\\hbar}{2m_0c^2}(\\phi^*\\partial_t\\phi - \\phi\\partial_t\\phi^*)$ is not positive definite. Dirac sought a first-order equation to fix this.` },
        ],
      },
      'XI-C': {
        title: 'The Dirac Equation',
        blocks: [
          { type: 'text', content: `Dirac sought a first-order relativistic wave equation. He required it to be first-order in both space and time (to have a positive-definite probability density). The result:` },
          { type: 'definition', title: 'Dirac Equation', content: ``, latex: `(i\\hbar\\gamma^\\mu\\partial_\\mu - m_0 c)\\psi = 0` },
          { type: 'text', content: `where $\\gamma^\\mu$ are $4\\times 4$ matrices satisfying the Clifford algebra $\\{\\gamma^\\mu, \\gamma^\\nu\\} = 2g^{\\mu\\nu}$. The wave function $\\psi$ is a 4-component **Dirac spinor**.` },
          { type: 'theorem', title: 'g-factor Prediction', content: `The Dirac equation automatically predicts the electron's magnetic moment with $g=2$ (compared to $g=1$ for orbital motion). The intrinsic magnetic moment is:`, latex: `\\boldsymbol{\\mu} = -\\frac{e}{m_e}\\mathbf{S}, \\quad g_s = 2` },
          { type: 'text', content: `Dirac's 1928 paper showed this follows without any additional assumption — a triumph of the relativistic formulation. The small correction from QED gives $g_s \\approx 2.002319...$` },
          { type: 'note', content: `The Dirac equation also predicts negative-energy solutions, which Dirac interpreted as the **Dirac sea**. The modern interpretation (Feynman-Stueckelberg) treats them as antiparticles (positrons) propagating forward in time.` },
        ],
      },
    },
  },

  // ============================================================
  // UNIT VI: FROBENIUS-FUCHS
  // ============================================================
  'VI': {
    overview: `The Frobenius-Fuchs method provides a systematic way to solve second-order linear ODEs with regular singular points by power series. It is the mathematical engine behind the analytic solutions for the SHO, hydrogen atom, and more.`,
    sections: {
      'VI-A': {
        title: 'Frobenius-Fuchs Method',
        blocks: [
          { type: 'text', content: `Consider a second-order ODE $\\psi'' + P(x)\\psi' + Q(x)\\psi = 0$. A point $x_0$ is a **regular singular point** if $(x-x_0)P(x)$ and $(x-x_0)^2 Q(x)$ are analytic at $x_0$. Frobenius's theorem guarantees a solution of the form:` },
          { type: 'display', latex: `\\psi(x) = (x-x_0)^r \\sum_{n=0}^\\infty a_n (x-x_0)^n` },
          { type: 'text', content: `Substituting into the ODE gives a recurrence relation for the $a_n$ and an **indicial equation** for $r$.` },
          { type: 'example', title: 'SHO via Frobenius', content: `For the SHO in dimensionless form, $f'' - 2yf' + (2n)f = 0$ (Hermite's equation). The series terminates when the coefficient of the $(n+1)$-th term vanishes, giving $2\\epsilon - 1 = 2n$ and hence $E = (n+1/2)\\hbar\\omega$.` },
          { type: 'example', title: 'Hydrogen via Frobenius', content: `For the radial equation of hydrogen, the series terminates (giving normalizable solutions) when $n_r + l + 1 = n$, where $n$ is the principal quantum number, giving $E_n = -13.6\\text{ eV}/n^2$.` },
        ],
      },
    },
  },
}

// ============================================================
// CHECKS: appended to sections via mergeChecks()
// ============================================================

const CHECKS = {
  'I-A': [
    { question: `Hamilton's principle says the physical path satisfies $\\delta S = 0$. What quantity is $S$?`,
      options: ['The kinetic energy', 'The total energy', 'The action $\\int L\\,dt$', 'The Hamiltonian'],
      answer: 2, explanation: `The action $S[q] = \\int L(q,\\dot{q},t)\\,dt$ is a functional of the path. Hamilton's principle says the true path makes $S$ stationary.` },
    { question: 'The canonical momentum conjugate to coordinate $q$ is defined as:',
      options: ['$m\\dot{q}$', '$\\partial L/\\partial q$', '$\\partial L/\\partial \\dot{q}$', '$\\partial H/\\partial q$'],
      answer: 2, explanation: 'By definition, $p = \\partial L/\\partial \\dot{q}$. For a free particle $L = \\frac{1}{2}m\\dot{q}^2$ gives the familiar $p = m\\dot{q}$, but in curved coordinates or with fields this can differ.' },
  ],
  'I-B': [
    { question: 'The Wilson-Sommerfeld rule $\\oint p\\,dq = nh$ applies to which type of system?',
      options: ['Any quantum system', 'Systems with classically periodic orbits', 'Systems with exactly one degree of freedom', 'Ground states only'],
      answer: 1, explanation: 'The WS rule is a semiclassical condition: the action integral over one classical period must be an integer multiple of $h$. It fails when there is no classical periodic orbit.' },
    { question: 'Why does the Wilson-Sommerfeld method fail to determine the zero-point energy offset?',
      options: ['Because it ignores gravity', 'Because it is a classical method — it cannot capture $\\hbar/2$ corrections from quantum uncertainty', 'Because Planck forgot to include it', 'Because the action integral diverges'],
      answer: 1, explanation: 'The WS method is purely classical. The true zero-point energy $E_0 = \\frac{1}{2}\\hbar\\omega$ comes from $[x,p]=i\\hbar$, which is absent in the classical treatment.' },
  ],
  'II-A': [
    { question: 'The inner product $\\langle u|v\\rangle$ is linear in which argument?',
      options: ['The first (bra)', 'The second (ket)', 'Both', 'Neither — it is sesquilinear'],
      answer: 1, explanation: 'The inner product is *linear* in the second argument and *anti-linear* (complex-conjugate-linear) in the first: $\\langle \\alpha u|v\\rangle = \\alpha^*\\langle u|v\\rangle$. Physicists place linearity in the ket; mathematicians use the reverse convention.' },
    { question: 'The resolution of identity $\\sum_n|n\\rangle\\langle n| = \\hat{I}$ is useful because:',
      options: ['It defines a new observable', 'It lets you insert a complete basis anywhere in a bracket expression', 'It is the definition of an inner product', 'It applies only to position eigenstates'],
      answer: 1, explanation: 'Inserting $\\hat{I} = \\sum_n|n\\rangle\\langle n|$ between operators or states lets you expand in any convenient basis. This is perhaps the most frequently used identity in QM calculations.' },
  ],
  'II-B': [
    { question: 'An operator $A$ is Hermitian if:',
      options: ['$A^2 = I$', '$A^\\dagger = -A$', '$A^\\dagger = A$', '$A^{-1} = A$'],
      answer: 2, explanation: '$A$ is Hermitian (self-adjoint) iff $A = A^\\dagger$, i.e. $\\langle u|Av\\rangle = \\langle Au|v\\rangle$ for all $u,v$. This guarantees real eigenvalues — essential for observable quantities.' },
    { question: 'Two Hermitian operators $A$ and $B$ have a complete set of simultaneous eigenstates if and only if:',
      options: ['$AB = 0$', '$[A,B] = 0$', '$A + B = I$', '$AB = BA^\\dagger$'],
      answer: 1, explanation: '$[A,B]=0$ (they commute) is the necessary and sufficient condition for simultaneous diagonalizability. Physically: compatible observables can be simultaneously measured with arbitrary precision.' },
  ],
  'III-A': [
    { question: 'According to the Born rule, if the system is in state $|\\psi\\rangle$, the probability of measuring eigenvalue $a_i$ is:',
      options: ['$\\langle\\psi|a_i\\rangle$', '$|\\langle a_i|\\psi\\rangle|^2$', '$\\langle\\psi|\\hat{A}|\\psi\\rangle$', '$\\langle a_i|\\hat{A}|\\psi\\rangle$'],
      answer: 1, explanation: '$P(a_i) = |\\langle a_i|\\psi\\rangle|^2$ is the Born rule. It is the square of the amplitude (overlap) between the current state and the eigenstate — not the amplitude itself.' },
    { question: 'Two observables are *incompatible* if:',
      options: ['They have different units', '$[\\hat{A},\\hat{B}] \\neq 0$', 'Their eigenvalues are complex', 'They cannot be Hermitian simultaneously'],
      answer: 1, explanation: 'Non-commuting observables cannot be simultaneously measured to arbitrary precision. The canonical example is $[\\hat{x},\\hat{p}] = i\\hbar \\neq 0$, which gives rise to the Heisenberg uncertainty principle.' },
  ],
  'III-B': [
    { question: 'In the position representation, the momentum operator acts as:',
      options: ['$p\\cdot\\psi(x)$', '$-i\\hbar \\frac{d}{dx}$', '$i\\hbar \\frac{d}{dx}$', '$\\frac{\\hbar^2}{2m}\\frac{d^2}{dx^2}$'],
      answer: 1, explanation: 'Since momentum generates spatial translations, $\\hat{p} = -i\\hbar \\partial_x$ in the position basis. The sign ensures $e^{ip_0 x/\\hbar}$ is an eigenstate with eigenvalue $p_0$.' },
    { question: 'The momentum-space wave function $\\phi(p) = \\langle p|\\psi\\rangle$ is related to $\\psi(x) = \\langle x|\\psi\\rangle$ by:',
      options: ['$\\phi(p) = \\psi(p)$', '$\\phi(p) = \\int e^{-ipx/\\hbar}\\psi(x)\\,dx/(\\sqrt{2\\pi\\hbar})$ — a Fourier transform', '$\\phi(p) = |\\psi(p)|^2$', '$\\phi(p) = \\hat{p}\\psi(p)$'],
      answer: 1, explanation: 'Inserting $\\hat{I} = \\int|x\\rangle\\langle x|dx$: $\\phi(p) = \\langle p|\\psi\\rangle = \\int\\langle p|x\\rangle\\psi(x)dx$. Since $\\langle p|x\\rangle = e^{-ipx/\\hbar}/\\sqrt{2\\pi\\hbar}$, this is precisely the Fourier transform. The position and momentum representations are Fourier duals.' },
    { question: 'A particle is in state $\\psi(x) = Ae^{-|x|/a}$. The expectation value $\\langle p \\rangle$ is:',
      options: ['$\\hbar/a$', '$0$ (since $\\psi$ is real and even)', '$-i\\hbar/a$', '$\\hbar^2/a^2$'],
      answer: 1, explanation: 'For any real wave function, $\\langle p\\rangle = -i\\hbar\\int\\psi^*\\psi\'\\,dx = 0$ because $\\psi^*\\psi\' = \\psi\\psi\'$ and $\\int\\psi\\psi\'\\,dx = [\\psi^2/2]_{-\\infty}^{\\infty} = 0$. More generally: a real, normalizable $\\psi$ always has $\\langle p\\rangle = 0$.' },
  ],
  'III-C': [
    { question: 'A stationary state $\\psi_n(x)e^{-iE_n t/\\hbar}$ is called "stationary" because:',
      options: ['The particle does not move', '$|\\psi_n(x)|^2$ is time-independent', 'The energy is exactly zero', 'The wave function is real'],
      answer: 1, explanation: 'Although the state picks up a phase $e^{-iE_n t/\\hbar}$, the probability density $|\\psi_n e^{-iE_n t/\\hbar}|^2 = |\\psi_n|^2$ is truly time-independent. All expectation values of time-independent operators are constant.' },
    { question: 'A particle is prepared in a superposition $|\\psi\\rangle = c_1|E_1\\rangle + c_2|E_2\\rangle$ with $E_1 \\neq E_2$. The probability of measuring energy $E_1$ at a later time $t$ is:',
      options: ['$|c_1|^2 e^{-iE_1 t/\\hbar}$', '$|c_1|^2$ (independent of time)', '$|c_1 + c_2 e^{-i(E_2-E_1)t/\\hbar}|^2$', '$|c_1|^2\\cos^2(E_1 t/\\hbar)$'],
      answer: 1, explanation: 'At time $t$: $|\\psi(t)\\rangle = c_1 e^{-iE_1 t/\\hbar}|E_1\\rangle + c_2 e^{-iE_2 t/\\hbar}|E_2\\rangle$. Probability of $E_1$ is $|\\langle E_1|\\psi(t)\\rangle|^2 = |c_1 e^{-iE_1 t/\\hbar}|^2 = |c_1|^2$. Energy measurement probabilities in a time-independent Hamiltonian are constant.' },
  ],
  'IV-A': [
    { question: 'The ground state ($n=1$) energy of the infinite square well is non-zero. This is because:',
      options: ['The potential energy is non-zero inside', 'The uncertainty principle requires $\\Delta p > 0$ when $\\Delta x$ is finite, so kinetic energy cannot vanish', 'The wave function must be normalized', 'Quantum numbers start at 1, not 0'],
      answer: 1, explanation: 'Confining the particle to $[0,L]$ forces $\\Delta x \\leq L$, which by the uncertainty principle $\\sigma_x\\sigma_p \\geq \\hbar/2$ means $\\Delta p > 0$. Non-zero momentum fluctuation means non-zero kinetic energy: $E_1 = \\pi^2\\hbar^2/(2mL^2) > 0$.' },
    { question: 'For a particle with energy $E < V_0$ incident on a potential barrier, quantum mechanics predicts:',
      options: ['The particle is always reflected', 'The particle can tunnel through with transmission $T > 0$', 'The particle accelerates through the barrier', 'The energy of the particle changes'],
      answer: 1, explanation: 'Quantum tunneling: even though classically the particle cannot enter $E < V$ regions, the wave function decays exponentially ($e^{-\\kappa x}$) but does not vanish. A transmitted wave emerges on the other side with $T = e^{-2\\kappa a}$ approximately.' },
  ],
  'IV-B': [
    { question: 'In 1D, bound energy levels are:',
      options: ['Always doubly degenerate', 'Non-degenerate', 'Infinitely degenerate', 'Degenerate only if the potential is symmetric'],
      answer: 1, explanation: 'The 1D non-degeneracy theorem: if two solutions have the same energy $E$, their Wronskian is constant. For bound states vanishing at $\\pm\\infty$, the Wronskian is zero, so the solutions are proportional — i.e., the same state.' },
    { question: 'The ground state wave function of any 1D potential has no nodes (interior zeros). This is because:',
      options: ['It must be real', 'Adding a node would require higher kinetic energy (more oscillation = higher $\\langle p^2\\rangle$) — the ground state minimizes energy', 'All symmetric wave functions lack nodes', 'The boundary conditions force this'],
      answer: 1, explanation: 'Each additional node raises the kinetic energy (analogous to adding a half-period of oscillation). Formally: the $n$-th eigenstate has exactly $n-1$ nodes (ISW example: $\\psi_n$ has $n-1$ zeros). The ground state ($n=1$) has zero nodes and the lowest possible energy.' },
    { question: 'The virial theorem states $2\\langle T\\rangle = n\\langle V\\rangle$ for $V\\propto x^n$. For the ISW (infinite square well), $\\langle V\\rangle = 0$ inside. This gives $2\\langle T\\rangle = 0$, which seems to contradict $E > 0$. The resolution is:',
      options: ['The ISW violates the virial theorem', 'The ISW potential is not of power-law form — the $V=\\infty$ walls contribute boundary terms that modify the theorem', '$\\langle T\\rangle = 0$ in the ISW', 'The ground state energy is actually zero'],
      answer: 1, explanation: 'The virial theorem as stated applies to smooth power-law potentials. The ISW has infinite potential walls which introduce surface terms at the boundaries. The correct statement for ISW is $2\\langle T\\rangle = 2E$ (since $\\langle V\\rangle = 0$ inside), confirming $E = \\langle T\\rangle = \\frac{\\pi^2\\hbar^2}{2mL^2}n^2$.' },
  ],
  'V-A': [
    { question: 'The evolution operator $U(t) = e^{-i\\hat{H}t/\\hbar}$ is unitary. This ensures:',
      options: ['Energy is conserved', 'Total probability $\\langle\\psi|\\psi\\rangle = 1$ is conserved in time', 'The Hamiltonian is Hermitian', 'The wave function is real'],
      answer: 1, explanation: '$U^\\dagger U = I$ means $\\langle\\psi(t)|\\psi(t)\\rangle = \\langle\\psi(0)|U^\\dagger U|\\psi(0)\\rangle = \\langle\\psi(0)|\\psi(0)\\rangle = 1$. Unitarity is the quantum manifestation of probability conservation.' },
  ],
  'V-B': [
    { question: "Ehrenfest's theorem states that $m\\frac{d\\langle x\\rangle}{dt} = \\langle p\\rangle$. This means:",
      options: ['Quantum particles follow classical trajectories', 'Expectation values obey classical equations of motion', 'Wave packets never spread', 'The uncertainty principle is violated for large masses'],
      answer: 1, explanation: "Ehrenfest's theorem says *expectation values* satisfy Newton's equations. But $\\langle -\\partial V/\\partial x\\rangle \\neq -\\partial V/\\partial\\langle x\\rangle$ in general, so only when the wave packet is narrow compared to the scale of $V$ does true classical behavior emerge." },
    { question: 'For a harmonic oscillator in eigenstate $|n\\rangle$, the virial theorem gives $\\langle T\\rangle = \\langle V\\rangle$. What is $\\langle T\\rangle$ for the ground state?',
      options: ['$0$', '$\\frac{1}{4}\\hbar\\omega$', '$\\frac{1}{2}\\hbar\\omega \\cdot \\frac{1}{2} = \\frac{1}{4}\\hbar\\omega$', '$\\frac{\\hbar\\omega}{2}$'],
      answer: 1, explanation: 'For SHO with $V = \\frac{1}{2}m\\omega^2 x^2$ ($n=2$ in virial): $2\\langle T\\rangle = 2\\langle V\\rangle$, so $\\langle T\\rangle = \\langle V\\rangle = E_n/2 = (n+\\frac{1}{2})\\hbar\\omega/2$. For ground state $n=0$: $\\langle T\\rangle = \\hbar\\omega/4$. This confirms the zero-point energy is split equally between kinetic and potential.' },
    { question: 'The Heisenberg picture operator $\\hat{x}_H(t) = e^{iHt/\\hbar}\\hat{x}e^{-iHt/\\hbar}$ for the free particle ($H=p^2/2m$) is:',
      options: ['$\\hat{x}$', '$\\hat{x} + \\hat{p}t/m$', '$\\hat{x}e^{-iHt/\\hbar}$', '$\\hat{x}\\cos(\\omega t)$'],
      answer: 1, explanation: 'From the Heisenberg equation: $\\dot{x}_H = i[H,x_H]/\\hbar = p_H/m$. Since $[H,p]=0$, $p_H$ is constant. Integrating: $x_H(t) = x_H(0) + p_H(0)t/m$. This is the operator version of the classical equation $x = x_0 + vt$, showing that free particles travel in straight lines on average.' },
  ],
  'V-C': [
    { question: 'The generalized uncertainty relation is $\\sigma_A\\sigma_B \\geq \\frac{1}{2}|\\langle[A,B]\\rangle|$. For spin operators $[S_x, S_y] = i\\hbar S_z$, what is $\\sigma_{S_x}\\sigma_{S_y}$ bounded by?',
      options: ['$\\frac{\\hbar}{2}|\\langle S_z\\rangle|$', '$\\hbar|\\langle S_z\\rangle|$', '$\\frac{\\hbar^2}{4}$', '$0$'],
      answer: 0, explanation: '$\\sigma_{S_x}\\sigma_{S_y} \\geq \\frac{1}{2}|\\langle i\\hbar S_z\\rangle| = \\frac{\\hbar}{2}|\\langle S_z\\rangle|$. For $|+\\rangle$ with $\\langle S_z\\rangle = \\hbar/2$ this gives $\\sigma_{S_x}\\sigma_{S_y} \\geq \\hbar^2/4$.' },
    { question: 'The minimum-uncertainty state (equality in $\\sigma_x\\sigma_p \\geq \\hbar/2$) is:',
      options: ['An energy eigenstate of the SHO', 'A momentum eigenstate', 'A Gaussian wave packet (coherent state)', 'Any real wave function'],
      answer: 2, explanation: 'The minimum uncertainty state saturates the Cauchy-Schwarz inequality. For $x$ and $p$, this requires $(\\hat{p} - \\langle p\\rangle)|\\psi\\rangle = i\\lambda(\\hat{x} - \\langle x\\rangle)|\\psi\\rangle$, whose solution is a Gaussian. These are the coherent states of the SHO.' },
  ],
  'VI-A': [
    { question: 'In the Frobenius method, the series $\\psi = x^r\\sum_n a_n x^n$ terminates (giving a polynomial) when:',
      options: ['$r$ is a positive integer', 'A recurrence coefficient becomes zero after finitely many steps', 'The differential equation has no singular points', '$a_0 = 0$'],
      answer: 1, explanation: 'Series termination occurs when the recurrence relation gives $a_{n+1} = 0$ for some $n$. For the SHO this happens when $2\\epsilon - 1 = 2n$ ($n\\in\\mathbb{Z}_{\\geq 0}$), giving the quantized energies $E_n = (n+1/2)\\hbar\\omega$.' },
  ],
  'VII-A': [
    { question: 'The SHO energy levels $E_n = (n+\\frac{1}{2})\\hbar\\omega$ are equally spaced with gap:',
      options: ['$\\hbar\\omega/2$', '$\\hbar\\omega$', '$2\\hbar\\omega$', '$h\\omega$'],
      answer: 1, explanation: 'Adjacent levels differ by $E_{n+1} - E_n = \\hbar\\omega$. This equal spacing is what makes the SHO so special: it has uniform level spacing, which is why photons (quanta of the EM field) have energy $\\hbar\\omega$.' },
    { question: 'The ground state energy $E_0 = \\frac{1}{2}\\hbar\\omega$ is called zero-point energy. It exists because:',
      options: ['The classical oscillator has minimum energy 0, but the quantum one cannot have both $x=0$ and $p=0$', 'The Hamiltonian contains an additive constant', 'Quantum numbers must start at 1', 'The harmonic potential has a non-zero minimum'],
      answer: 0, explanation: 'Setting $\\langle x\\rangle = \\langle p\\rangle = 0$ does not mean $x = p = 0$ simultaneously. By $\\sigma_x\\sigma_p \\geq \\hbar/2$, both cannot vanish: $E = \\langle p^2\\rangle/(2m) + \\frac{1}{2}m\\omega^2\\langle x^2\\rangle \\geq \\hbar\\omega/2$.' },
  ],
  'VII-B': [
    { question: 'The commutator $[a, a^\\dagger]$ equals:',
      options: ['$0$', '$1$', '$\\hbar\\omega$', '$\\hat{N}$'],
      answer: 1, explanation: '$[a,a^\\dagger] = 1$ follows from $[x,p]=i\\hbar$. This single relation, together with $H = \\hbar\\omega(a^\\dagger a + 1/2)$, determines the entire spectrum algebraically without solving any differential equation.' },
    { question: 'If $|n\\rangle$ is an energy eigenstate with $E_n = (n+1/2)\\hbar\\omega$, what is $a^\\dagger|n\\rangle$?',
      options: ['$|n\\rangle$', '$\\sqrt{n}|n-1\\rangle$', '$\\sqrt{n+1}|n+1\\rangle$', '$(n+1)|n+1\\rangle$'],
      answer: 2, explanation: '$a^\\dagger|n\\rangle = \\sqrt{n+1}|n+1\\rangle$. The $\\sqrt{n+1}$ factor comes from normalization: $\\|a^\\dagger|n\\rangle\\|^2 = \\langle n|aa^\\dagger|n\\rangle = \\langle n|(N+1)|n\\rangle = n+1$.' },
  ],
  'VII-C': [
    { question: 'A coherent state $|\\alpha\\rangle$ satisfies $a|\\alpha\\rangle = \\alpha|\\alpha\\rangle$. Under time evolution, $|\\alpha(t)\\rangle = |\\alpha e^{-i\\omega t}\\rangle$. This means:',
      options: ['The state spreads like a free-particle wave packet', 'The coherent state remains a coherent state with the amplitude rotating in phase space at the classical frequency', 'The expectation value of energy changes with time', 'The state eventually collapses to the ground state'],
      answer: 1, explanation: 'Coherent states are minimum-uncertainty states that *do not spread*. The amplitude $\\alpha(t) = \\alpha e^{-i\\omega t}$ traces a circle in the complex plane, exactly mimicking classical oscillatory motion.' },
  ],
  'VIII-A': [
    { question: 'In the effective radial Schrödinger equation, the term $\\hbar^2 l(l+1)/(2mr^2)$ acts as:',
      options: ['A constant energy shift', 'A centrifugal barrier that pushes the wave function away from the origin', 'The Coulomb potential', 'The kinetic energy'],
      answer: 1, explanation: 'The $\\hbar^2 l(l+1)/(2mr^2)$ term is a centrifugal barrier. For $l > 0$ it diverges at $r=0$, forcing $R_{nl}(0) = 0$. It arises from the $\\langle L^2\\rangle/(2mr^2)$ contribution to kinetic energy in spherical coordinates.' },
  ],
  'VIII-B': [
    { question: 'From the algebra $[J_i,J_j] = i\\hbar\\epsilon_{ijk}J_k$ alone, the allowed values of the quantum number $j$ are:',
      options: ['Only non-negative integers', 'Only half-integers', 'Non-negative integers AND half-integers ($0, \\frac{1}{2}, 1, \\frac{3}{2},\\ldots$)', 'Any real number'],
      answer: 2, explanation: 'The purely algebraic derivation (using ladder operators to show the spectrum must be bounded and that termination gives $j(j+1) = m_{\\max}(m_{\\max}+1)$) allows *both* integer and half-integer values. Orbital angular momentum ($l$) is integer; spin-1/2 is half-integer.' },
    { question: 'The operator $L^2$ commutes with $L_x$, $L_y$, $L_z$. What is the physical significance of $[L^2, L_z] = 0$?',
      options: ['$L^2$ and $L_z$ can be simultaneously measured', '$L_z$ is not conserved', 'The eigenvalues of $L^2$ are zero', '$L^2 = L_z$'],
      answer: 0, explanation: 'Commuting operators share a complete set of simultaneous eigenstates, so $L^2$ and $L_z$ can be simultaneously measured. This is why we label states $|l,m\\rangle$ with both quantum numbers. $L_x$ and $L_y$ do not commute with $L_z$, so only one component is definite.' },
  ],
  'VIII-C': [
    { question: 'The hydrogen energy levels $E_n = -13.6\\text{ eV}/n^2$ have a degeneracy (ignoring spin) of:',
      options: ['$n$', '$2l+1$', '$n^2$', '$2n^2$'],
      answer: 2, explanation: '$\\sum_{l=0}^{n-1}(2l+1) = n^2$. This counts all $(l,m)$ combinations for fixed $n$. With electron spin ($m_s = \\pm1/2$), the degeneracy is $2n^2$. The $l$-degeneracy is "accidental" — it arises from a hidden SO(4) symmetry.' },
    { question: 'The Bohr radius $a_0 \\approx 0.529$ Å sets the length scale for hydrogen. It is defined as:',
      options: ['The most probable radius in the ground state', '$\\hbar^2/(m_e e^2/(4\\pi\\epsilon_0))$', 'Both of the above — they give the same value', 'The radius at which $|\\psi_{100}|^2$ is maximum'],
      answer: 2, explanation: 'Both definitions agree. Variational calculation: minimize $\\langle E\\rangle = \\langle T\\rangle + \\langle V\\rangle$ with $\\psi \\sim e^{-r/a}$, minimize over $a$: gives $a_0 = \\hbar^2/(m_e e^2/4\\pi\\epsilon_0)$. Also, $r_{\\max}$ of $r^2|R_{10}|^2$ occurs at $r = a_0$.' },
  ],
  'IX-A': [
    { question: 'Angular momentum operators satisfy $[J_i, J_j] = i\\hbar\\epsilon_{ijk}J_k$. Which of the following can be simultaneously specified?',
      options: ['$J_x$ and $J_y$', '$J^2$ and $J_z$', '$J_x$, $J_y$, and $J_z$', '$J_x$ and $J^2$, but not $J_y$'],
      answer: 1, explanation: '$[J^2, J_z] = 0$ (they commute), so $J^2$ and $J_z$ can be simultaneously measured → states $|j,m\\rangle$. But $[J_x, J_y] = i\\hbar J_z \\neq 0$, so no two different components can be simultaneously specified.' },
  ],
  'IX-B': [
    { question: 'The Pauli matrix $\\sigma_x = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$ has eigenstates:',
      options: ['$|+\\rangle = (1,0)^T$ and $|-\\rangle = (0,1)^T$', '$|+x\\rangle = (|+\\rangle+|-\\rangle)/\\sqrt{2}$ and $|-x\\rangle = (|+\\rangle-|-\\rangle)/\\sqrt{2}$', '$|+\\rangle = (1,i)^T/\\sqrt{2}$ and $|-\\rangle = (1,-i)^T/\\sqrt{2}$', 'It has no eigenstates'],
      answer: 1, explanation: '$\\sigma_x(1,1)^T/\\sqrt{2} = (1,1)^T/\\sqrt{2}$ with eigenvalue $+1$, and $\\sigma_x(1,-1)^T/\\sqrt{2} = -(1,-1)^T/\\sqrt{2}$ with eigenvalue $-1$. These are the $|\\pm x\\rangle$ states in the $S_z$ basis.' },
    { question: 'A spin-1/2 particle precesses in a magnetic field $\\mathbf{B} = B\\hat{z}$. The precession frequency is:',
      options: ['$\\omega = eB/(2m_e)$ (Larmor frequency)', '$\\omega = eB/m_e$ (cyclotron frequency)', '$\\omega = \\hbar eB/m_e$', '$\\omega = g_s eB/(2m_e)$'],
      answer: 1, explanation: 'The Hamiltonian is $H = \\omega_0 S_z$ with $\\omega_0 = eB/m_e$ for a spin-1/2 particle (the $g_s=2$ factor and the $\\hbar/2$ in $S_z = \\hbar\\sigma_z/2$ combine: $\\omega = g_s \\cdot eB/(2m_e) = eB/m_e$). This is twice the classical Larmor frequency.' },
  ],
  'IX-C': [
    { question: 'When combining spin $j_1 = 1$ and $j_2 = 1/2$, the possible total angular momentum values are:',
      options: ['$j = 3/2$ only', '$j = 1/2$ only', '$j = 3/2$ and $j = 1/2$', '$j = 0, 1, 2$'],
      answer: 2, explanation: 'The Clebsch-Gordan decomposition gives $j = |j_1 - j_2|, \\ldots, j_1 + j_2 = 1/2, 3/2$. The $(2j_1+1)(2j_2+1) = 6$ states split into a $j=3/2$ multiplet (4 states) and a $j=1/2$ doublet (2 states).' },
    { question: 'For two spin-1/2 particles, the singlet state $|0,0\\rangle$ is:',
      options: ['$|{+}\\rangle|{+}\\rangle$', '$\\frac{1}{\\sqrt{2}}(|{+}\\rangle|{-}\\rangle + |{-}\\rangle|{+}\\rangle)$', '$\\frac{1}{\\sqrt{2}}(|{+}\\rangle|{-}\\rangle - |{-}\\rangle|{+}\\rangle)$', '$|{-}\\rangle|{-}\\rangle$'],
      answer: 2, explanation: 'The singlet $|0,0\\rangle = (|{+}\\rangle|{-}\\rangle - |{-}\\rangle|{+}\\rangle)/\\sqrt{2}$ is *antisymmetric* under particle exchange. It has $j=0$, $m=0$, and is annihilated by all components of $\\hat{J}$. The three triplet states are symmetric.' },
    { question: 'The identity $\\hat{\\mathbf{L}}\\cdot\\hat{\\mathbf{S}} = \\frac{1}{2}(J^2 - L^2 - S^2)$ is useful because:',
      options: ['$L$ and $S$ are always parallel', 'It lets you evaluate $\\langle\\mathbf{L}\\cdot\\mathbf{S}\\rangle$ easily in the coupled $|j,m\\rangle$ basis where $J^2$, $L^2$, $S^2$ are all diagonal', 'It proves $L$ and $S$ commute', 'It is only valid for $l=1$'],
      answer: 1, explanation: 'In the uncoupled basis $|l,m_l\\rangle|s,m_s\\rangle$, $\\mathbf{L}\\cdot\\mathbf{S} = L_x S_x + L_y S_y + L_z S_z$ is messy. But in the coupled basis $|j,m;l,s\\rangle$: $J^2 = L^2 + 2\\mathbf{L}\\cdot\\mathbf{S} + S^2$, so $\\langle\\mathbf{L}\\cdot\\mathbf{S}\\rangle = \\hbar^2[j(j+1)-l(l+1)-s(s+1)]/2$.' },
  ],
  'X-A': [
    { question: 'In Feynman\'s path integral, each path contributes a factor $e^{iS[x]/\\hbar}$. Why do paths near the classical path dominate in the classical limit?',
      options: ['They have larger amplitude', 'Neighboring paths have nearby values of $S$, so their phases $e^{iS/\\hbar}$ add constructively, while distant paths have rapidly oscillating phases that cancel', 'The classical path has $S = 0$', 'Because $\\hbar \\to \\infty$ classically'],
      answer: 1, explanation: 'This is stationary phase approximation. Near the classical path (where $\\delta S=0$), $S$ is approximately constant, so phases align. Off the classical path, $S$ varies rapidly and the oscillatory integrand averages to zero. This is the quantum origin of the principle of least action.' },
  ],
  'X-B': [
    { question: 'The path integral in the classical limit $\\hbar \\to 0$ reduces to $e^{iS_{\\text{cl}}/\\hbar}$. This is consistent with:',
      options: ['Quantum particles being described by definite positions', 'The principle of least action — classical paths are those that make $S$ stationary', 'Energy being quantized classically', 'The uncertainty principle being violated'],
      answer: 1, explanation: 'The stationary phase condition $\\delta S = 0$ is precisely the principle of least action, which gives the classical equations of motion. So the path integral *derives* classical mechanics as a special case of quantum mechanics.' },
  ],
  'XI-B': [
    { question: 'The Klein-Gordon equation has a problem as a single-particle wave equation because:',
      options: ['It is not Lorentz covariant', 'The "probability density" derived from it can be negative', 'It predicts only integer-spin particles', 'It does not reduce to the Schrödinger equation in the non-relativistic limit'],
      answer: 1, explanation: 'The K-G probability density $\\rho = (i\\hbar/2m_0c^2)(\\phi^*\\partial_t\\phi - \\phi\\partial_t\\phi^*)$ can be *negative* (unlike $|\\psi|^2\\geq 0$), so it cannot be interpreted as a probability density. This drove Dirac to seek a first-order equation.' },
  ],
  'XI-C': [
    { question: 'The Dirac equation requires $\\psi$ to be a 4-component spinor. The extra 2 components (beyond the 2 spin states) correspond to:',
      options: ['Position and momentum', 'Antiparticle states (positrons)', 'The two spatial degrees of freedom', 'Orbital angular momentum $l = 0$ and $l = 1$'],
      answer: 1, explanation: 'The 4 components of a Dirac spinor represent: spin-up/down for particles, AND spin-up/down for antiparticles. The negative-energy solutions are reinterpreted (Feynman-Stueckelberg) as antiparticles (positrons) propagating forward in time.' },
    { question: 'The Dirac equation automatically predicts the electron\'s g-factor to be $g_s = 2$. In terms of the magnetic moment, this means:',
      options: ['$\\boldsymbol{\\mu} = -\\frac{e}{2m_e}\\mathbf{S}$ (same as orbital)', '$\\boldsymbol{\\mu} = -\\frac{e}{m_e}\\mathbf{S}$ (twice as large as orbital $l$)', '$\\boldsymbol{\\mu} = -\\frac{2e}{m_e}\\mathbf{S}$', '$\\boldsymbol{\\mu} = -\\frac{e\\hbar}{4m_e}$'],
      answer: 1, explanation: 'For orbital angular momentum, $\\boldsymbol{\\mu} = -\\frac{e}{2m_e}\\mathbf{L}$ (gyromagnetic ratio $g=1$). The Dirac equation gives $\\boldsymbol{\\mu} = -\\frac{e}{m_e}\\mathbf{S}$, i.e., $g_s=2$: twice the classical ratio. QED then gives the tiny correction $g_s - 2 \\approx \\alpha/\\pi \\approx 0.00232$.' },
  ],
  'IV-A': [
    { question: 'For a particle in an infinite square well of width $L$, compute $E_3/E_1$:',
      options: ['3', '6', '9', '12'],
      answer: 2, explanation: '$E_n = n^2 E_1$ since $E_n \\propto n^2$. So $E_3 = 9E_1$, giving $E_3/E_1 = 9$. This is very different from the SHO where $E_n/E_0 = (n+1/2)/(1/2)$ — the ISW levels grow quadratically while SHO are equally spaced.' },
    { question: 'Quantum tunneling through a barrier is exponentially sensitive to barrier thickness $d$ because:',
      options: ['Probability is proportional to $d$', 'The wave function decays as $e^{-\\kappa d}$ inside the barrier, so $T \\approx e^{-2\\kappa d}$ (exponential in $d$)', 'The barrier absorbs energy', 'The particle slows down inside the barrier'],
      answer: 1, explanation: 'The evanescent wave function $\\psi \\sim e^{-\\kappa x}$ (with $\\kappa = \\sqrt{2m(V_0-E)}/\\hbar$) means the amplitude at the far side is $\\sim e^{-\\kappa d}$, so probability $T \\sim e^{-2\\kappa d}$. This extreme sensitivity (an extra ångström can change $T$ by an order of magnitude) is exploited in STM.' },
    { question: 'A particle in the ground state of an infinite square well has $\\langle x \\rangle = L/2$ and $\\langle x^2 \\rangle = L^2(1/3 - 1/(2\\pi^2))$. What is $\\sigma_x$?',
      options: ['$L/\\pi$', '$L\\sqrt{1/12 - 1/(2\\pi^2)}$', '$L/2\\pi$', '$L/\\sqrt{3}$'],
      answer: 1, explanation: '$\\sigma_x^2 = \\langle x^2\\rangle - \\langle x\\rangle^2 = L^2(1/3 - 1/(2\\pi^2)) - L^2/4 = L^2(1/12 - 1/(2\\pi^2))$. So $\\sigma_x = L\\sqrt{1/12 - 1/(2\\pi^2)} \\approx 0.181L$.' },
  ],
  'V-A': [
    { question: 'In the ISW, a state $|\\psi(0)\\rangle = (|1\\rangle + |2\\rangle)/\\sqrt{2}$ (superposition of $n=1$ and $n=2$). At time $t$, the probability density $|\\psi(x,t)|^2$:',
      options: ['Is time-independent', 'Oscillates at frequency $\\omega_{12} = (E_2-E_1)/\\hbar$', 'Oscillates at frequency $E_1/\\hbar$', 'Spreads to a uniform distribution'],
      answer: 1, explanation: '$|\\psi(x,t)|^2 = \\frac{1}{2}[|\\psi_1|^2 + |\\psi_2|^2 + 2\\text{Re}(\\psi_1^*\\psi_2 e^{i(E_2-E_1)t/\\hbar})]$. The cross term oscillates at $\\omega_{12} = (E_2-E_1)/\\hbar = 3E_1/\\hbar$ (since $E_2 = 4E_1$). This "quantum beat" is observable as a time-oscillating charge density.' },
    { question: 'The probability current $J = \\frac{\\hbar}{m}\\text{Im}[\\psi^*\\psi\']$ for a plane wave $\\psi = Ae^{ikx}$ is:',
      options: ['$0$', '$|A|^2 \\hbar k/m = |A|^2 v$', '$|A|^2 \\hbar^2 k^2/(2m)$', '$|A|^2 k$'],
      answer: 1, explanation: '$J = \\frac{\\hbar}{m}\\text{Im}[(Ae^{-ikx})^*(ikAe^{ikx})] = \\frac{\\hbar}{m}|A|^2 k = |A|^2 \\hbar k/m = |A|^2 v$ where $v = \\hbar k/m$ is the classical velocity. This justifies $T = |t|^2$ for equal $k$ in incident and transmitted regions.' },
  ],
  'VIII-D': [
    { question: 'In matrix mechanics, the position matrix element $\\langle m|\\hat{x}|n\\rangle$ for the SHO is non-zero only when:',
      options: ['$m = n$', '$m = n \\pm 1$', '$m = n \\pm 2$', 'For any $m, n$'],
      answer: 1, explanation: 'Since $\\hat{x} = \\sqrt{\\hbar/(2m\\omega)}(a+a^\\dagger)$ and $a|n\\rangle = \\sqrt{n}|n-1\\rangle$, $a^\\dagger|n\\rangle = \\sqrt{n+1}|n+1\\rangle$, only the matrix elements with $m = n\\pm 1$ are non-zero. The position operator is *tridiagonal* in the energy eigenbasis.' },
    { question: 'The Heisenberg equation of motion gives $\\dot{x}_H = p_H/m$ and $\\dot{p}_H = -m\\omega^2 x_H$ for the SHO. The solution $x_H(t)$ is:',
      options: ['$x_H(0)$', '$x_H(0)e^{-i\\omega t}$', '$x_H(0)\\cos(\\omega t) + p_H(0)\\sin(\\omega t)/(m\\omega)$', '$x_H(0) + p_H(0)t/m$'],
      answer: 2, explanation: 'The Heisenberg equations are classical in form: $\\ddot{x}_H + \\omega^2 x_H = 0$. The operator $x_H(t)$ oscillates classically: $x_H(t) = x_H(0)\\cos(\\omega t) + \\frac{p_H(0)}{m\\omega}\\sin(\\omega t)$. This is Ehrenfest\'s theorem in operator form.' },
  ],
  'IX-D': [
    { question: 'Helium has two electrons. The ground state has both electrons in the $1s$ orbital. Why is this consistent with the Pauli exclusion principle?',
      options: ['The Pauli principle does not apply to electrons in different atoms', 'The two electrons have opposite spin ($m_s = +1/2$ and $m_s = -1/2$), so they are in different quantum states', 'The $1s$ orbital can hold any number of electrons', 'Both electrons are in the same state, violating Pauli'],
      answer: 1, explanation: 'The Pauli principle says no two identical fermions can occupy the same quantum state. The two electrons differ in spin quantum number: one has $m_s = +1/2$, the other $-1/2$. So they occupy states $(n=1, l=0, m_l=0, m_s=+1/2)$ and $(n=1, l=0, m_l=0, m_s=-1/2)$ — distinct states.' },
    { question: 'Bosons obey Bose-Einstein statistics, meaning:',
      options: ['Many identical bosons can occupy the same quantum state', 'No two bosons can occupy the same state', 'Bosons repel each other', 'Bosons only have integer mass'],
      answer: 0, explanation: 'The symmetric wave function for bosons allows — in fact *enhances* — the probability of multiple particles occupying the same state. This is the quantum origin of laser coherence (photons are bosons), Bose-Einstein condensation, and stimulated emission.' },
  ],
  'X-C': [
    { question: 'The free-particle propagator $K_0(x_f, T; x_i, 0) = \\sqrt{m/(2\\pi i\\hbar T)} e^{im(x_f-x_i)^2/(2\\hbar T)}$ is a Gaussian in $x_f - x_i$. The width of this Gaussian grows as:',
      options: ['Constant', '$\\sqrt{T}$', '$T$', '$T^2$'],
      answer: 1, explanation: 'The "width" of the Gaussian is $\\sigma \\sim \\sqrt{\\hbar T/m}$ (from the exponent $\\sim (x_f-x_i)^2 m/(2\\hbar T)$). This $\\sqrt{T}$ spreading is the quantum diffusion — identical in form to classical diffusion, but arising from the uncertainty principle rather than random collisions.' },
    { question: 'The SHO propagator $K(x_f, T; x_i, 0)$ has a pole at $T = \\pi/\\omega$. This is because:',
      options: ['The SHO energy levels are equally spaced', 'At $T = \\pi/\\omega$ (half period), all classical trajectories from $x_i$ refocus at $x_f = -x_i$ — a classical caustic', 'The propagator is not normalizable', 'The action diverges'],
      answer: 1, explanation: 'At $T = \\pi/\\omega$, a classical harmonic oscillator is at $-x_i$ regardless of initial momentum — this is a caustic (focusing) point. In the quantum propagator $K \\propto 1/\\sqrt{\\sin(\\omega T)}$, this manifests as a pole. At $T = 2\\pi/\\omega$ (full period), $K$ returns to $\\delta(x_f - x_i)$.' },
  ],
  'X-D': [
    { question: 'The phase-space path integral $\\int \\mathcal{D}x\\,\\mathcal{D}p\\, e^{i\\int(p\\dot{x}-H)dt/\\hbar}$ reduces to the Lagrangian path integral when:',
      options: ['$H$ is time-independent', 'The momentum integral is Gaussian (i.e., $H = p^2/(2m) + V(x)$)', 'The potential is zero', 'The paths are straight lines'],
      answer: 1, explanation: 'When $H = p^2/(2m) + V(x)$, the momentum integral $\\int dp\\, e^{i(p\\dot{x} - p^2/2m)t/\\hbar}$ is Gaussian and can be done analytically. The result is $e^{i\\int L\\,dt/\\hbar}$ where $L = \\frac{1}{2}m\\dot{x}^2 - V(x)$. Non-quadratic $H$ does not allow this simplification.' },
  ],
  'XI-A': [
    { question: 'The Lorentz algebra $\\mathfrak{so}(1,3)$ decomposes as $\\mathfrak{su}(2)_L \\oplus \\mathfrak{su}(2)_R$ over $\\mathbb{C}$. The representation $(1/2, 0)$ corresponds to:',
      options: ['A 4-vector', 'A left-handed Weyl spinor (2 components)', 'A Dirac spinor (4 components)', 'A scalar'],
      answer: 1, explanation: 'Representation $(j_L, j_R)$ has dimension $(2j_L+1)(2j_R+1)$. The $(1/2,0)$ representation has dimension $(2)(1) = 2$ — a left-handed Weyl spinor. The $(0,1/2)$ is the right-handed Weyl spinor. A Dirac spinor lives in $(1/2,0)\\oplus(0,1/2)$ — 4 components.' },
    { question: 'Under a spatial rotation by $2\\pi$ (full rotation), a Dirac spinor transforms as:',
      options: ['Returns to itself (unchanged)', 'Picks up a factor of $-1$', 'Picks up a phase $e^{i\\pi/4}$', 'Becomes zero'],
      answer: 1, explanation: 'A spin-$j$ state under rotation by $2\\pi$ around any axis gives $e^{-i\\cdot 2\\pi j} = (-1)^{2j}$. For half-integer spin ($j = 1/2$): $(-1)^1 = -1$. So spinors pick up a $-1$ under $2\\pi$ rotation — they need $4\\pi$ to return. This is observable in neutron interferometry experiments.' },
  ],
}

// ───────────────────────────────────────────────────────────────
// MISSING SECTION CONTENT
// ───────────────────────────────────────────────────────────────

CONTENT['VIII'].sections['VIII-B'] = {
  title: 'Algebraic Approach to Angular Momentum',
  blocks: [
    { type: 'text', content: `The angular momentum algebra can be solved *completely* using only the commutation relations — without ever writing down a differential equation. This algebraic approach, modeled on the SHO ladder operators, reveals that half-integer values of $j$ are possible, predicting the existence of spin.` },
    { type: 'heading', text: 'The Commutation Relations', anchor: 'angular-momentum-commutation' },
    { type: 'definition', title: 'Angular Momentum Algebra', content: `The components of any angular momentum operator $\\hat{J}$ satisfy:`, latex: `[J_i, J_j] = i\\hbar\\epsilon_{ijk}J_k \\quad \\Longrightarrow \\quad [J_x,J_y] = i\\hbar J_z,\\; [J_y,J_z]=i\\hbar J_x,\\; [J_z,J_x]=i\\hbar J_y` },
    { type: 'theorem', title: '$J^2$ commutes with all components', content: `Define $J^2 = J_x^2 + J_y^2 + J_z^2$. Then $[J^2, J_i] = 0$ for $i = x, y, z$.`, latex: `\\text{Proof: }[J^2, J_z] = [J_x^2, J_z] + [J_y^2, J_z] = J_x[J_x,J_z] + [J_x,J_z]J_x + \\cdots = 0` },
    { type: 'text', content: `Since $[J^2, J_z] = 0$, we can find simultaneous eigenstates of $J^2$ and $J_z$. These are the states $|j, m\\rangle$. The other components $J_x$, $J_y$ do *not* commute with $J_z$, so only one component can be specified.` },
    { type: 'heading', text: 'Ladder Operators', anchor: 'ladder-operators' },
    { type: 'definition', title: 'Raising and Lowering Operators', content: `Define $J_\\pm = J_x \\pm iJ_y$. Key commutators:`, latex: `[J_z, J_\\pm] = \\pm\\hbar J_\\pm, \\qquad [J_+, J_-] = 2\\hbar J_z` },
    { type: 'text', content: `The first commutator tells us: if $|j,m\\rangle$ is an eigenstate with $J_z|j,m\\rangle = m\\hbar|j,m\\rangle$, then $J_\\pm|j,m\\rangle$ has $J_z$-eigenvalue $(m\\pm 1)\\hbar$. So $J_+$ raises $m$ by 1 and $J_-$ lowers $m$ by 1.` },
    { type: 'theorem', title: 'Spectrum from Algebra', content: `Since $J^2 - J_z^2 = \\frac{1}{2}(J_+J_- + J_-J_+) \\geq 0$, the eigenvalues satisfy $\\hbar^2 j(j+1) \\geq m^2\\hbar^2$, so $|m| \\leq j$. The ladder must terminate at some $m_{\\max}$: $J_+|j, m_{\\max}\\rangle = 0$. Applying $J_-J_+$ gives $j(j+1) = m_{\\max}(m_{\\max}+1)$, so $m_{\\max} = j$.`, latex: `J_\\pm|j,m\\rangle = \\hbar\\sqrt{j(j+1) - m(m\\pm 1)}\\;|j,m\\pm 1\\rangle` },
    { type: 'theorem', title: 'Allowed Values', content: `Starting from $m_{\\max} = j$ and stepping down by integers, the lowest eigenvalue must be $m_{\\min} = -j$, and $j - (-j) = 2j$ must be a non-negative integer. Therefore:`, latex: `j = 0,\\; \\tfrac{1}{2},\\; 1,\\; \\tfrac{3}{2},\\; 2,\\; \\ldots \\qquad m = -j, -j+1, \\ldots, j` },
    { type: 'note', content: `*Half-integer* values are allowed! Orbital angular momentum $\\hat{L} = \\hat{r}\\times\\hat{p}$ in position space gives only integer $l$ (because $\\psi$ must be single-valued). But the algebra alone permits $j = 1/2, 3/2, \\ldots$, predicting the existence of spin angular momentum with no classical analog.` },
    { type: 'heading', text: 'Connection to Rotations', anchor: 'rotation-generators' },
    { type: 'text', content: `Angular momentum is the generator of rotations. A rotation by angle $\\phi$ about axis $\\hat{n}$ is implemented by the unitary operator:` },
    { type: 'display', latex: `\\hat{R}(\\hat{n}, \\phi) = e^{-i\\phi\\,\\hat{n}\\cdot\\hat{J}/\\hbar}` },
    { type: 'text', content: `For spin-1/2, a $2\\pi$ rotation gives $e^{-i\\pi\\sigma_z} = -I$ — a minus sign! Spinors are *not* single-valued under $2\\pi$ rotations. A $4\\pi$ rotation returns to the original state. This is a topological property of the rotation group $\\text{SO}(3)$: its universal cover is $\\text{SU}(2)$.` },
    { type: 'shankar', content: `Shankar Ch. 12 develops angular momentum entirely algebraically before introducing spherical coordinates. His treatment of the rotation group and the distinction between $\\text{SU}(2)$ and $\\text{SO}(3)$ is particularly clear. The key insight: QM must use *representations* of $\\text{SU}(2)$, which includes half-integer spins.` },
    { type: 'mcintyre', content: `McIntyre Ch. 3 introduces spin-1/2 first, showing that the commutation relations are satisfied by $\\hat{S}_i = \\frac{\\hbar}{2}\\sigma_i$. This bottom-up approach builds intuition: you see a concrete example of half-integer angular momentum before the general theory.` },
  ],
  checks: CHECKS['VIII-B'],
}

CONTENT['VIII'].sections['VIII-D'] = {
  title: 'Matrix Mechanics',
  blocks: [
    { type: 'text', content: `Matrix mechanics (Heisenberg, Born, Jordan 1925) was the first complete formulation of quantum mechanics, predating Schrödinger's wave mechanics by several months. In the energy eigenbasis, operators become matrices and the Heisenberg equations of motion become matrix equations.` },
    { type: 'definition', title: 'Matrix Elements', content: `In any orthonormal basis $\\{|n\\rangle\\}$, an operator $\\hat{A}$ has matrix elements $A_{mn} = \\langle m|\\hat{A}|n\\rangle$. The Hamiltonian is diagonal in its own eigenbasis: $(H)_{mn} = E_n\\delta_{mn}$.` },
    { type: 'example', title: 'SHO Position Matrix', content: `Using $\\hat{x} = \\sqrt{\\hbar/(2m\\omega)}(a + a^\\dagger)$:`, latex: `(x)_{mn} = \\langle m|\\hat{x}|n\\rangle = \\sqrt{\\frac{\\hbar}{2m\\omega}}\\left(\\sqrt{n}\\,\\delta_{m,n-1} + \\sqrt{n+1}\\,\\delta_{m,n+1}\\right)` },
    { type: 'text', content: `The position matrix is tri-diagonal (only adjacent energy levels are connected). This is because $\\hat{x}$ is linear in $a, a^\\dagger$ which change $n$ by exactly $\\pm 1$.` },
    { type: 'theorem', title: 'Heisenberg Equations in Matrix Form', content: `In the Heisenberg picture, matrix elements evolve as:`, latex: `\\frac{d}{dt}A_{mn} = \\frac{i}{\\hbar}(H_{mk}A_{kn} - A_{mk}H_{kn}) = \\frac{i}{\\hbar}(E_m - E_n)A_{mn}` },
    { type: 'text', content: `So $A_{mn}(t) = A_{mn}(0)e^{i\\omega_{mn}t}$ where $\\omega_{mn} = (E_m - E_n)/\\hbar$ — the Bohr frequencies. The matrix mechanics equations are equivalent to Bohr's frequency rule, which was one of the great confirmations of the theory.` },
    { type: 'shankar', content: `Shankar Ch. 1.9–1.10 discusses the historical development of matrix mechanics and its equivalence to wave mechanics (shown by Schrödinger in 1926 and rigorously by von Neumann in 1932). The abstract Hilbert-space formulation unifies both.` },
  ],
}

CONTENT['IX'].sections['IX-D'] = {
  title: 'Spin, Statistics & All That',
  blocks: [
    { type: 'text', content: `One of the deepest results in quantum field theory connects the spin of a particle to its statistics — whether it obeys Bose-Einstein or Fermi-Dirac statistics. This *spin-statistics theorem* is a consequence of special relativity combined with quantum mechanics.` },
    { type: 'heading', text: 'Identical Particles', anchor: 'identical-particles' },
    { type: 'definition', title: 'Symmetrization Postulate', content: `In quantum mechanics, identical particles are truly indistinguishable — swapping any two particles leaves the state physically unchanged (up to a phase). The symmetrization postulate:`, latex: `|\\psi(1,2)\\rangle = \\pm|\\psi(2,1)\\rangle` },
    { type: 'text', content: `The $+$ sign describes *bosons* (integer spin), the $-$ sign describes *fermions* (half-integer spin). This is not a new postulate — it follows from the spin-statistics theorem.` },
    { type: 'theorem', title: 'Pauli Exclusion Principle', content: `For fermions, $|\\psi(1,2)\\rangle = -|\\psi(2,1)\\rangle$. If particles 1 and 2 are in the same state $|\\phi\\rangle$:`, latex: `|\\psi\\rangle = |\\phi\\rangle_1|\\phi\\rangle_2 = -|\\phi\\rangle_2|\\phi\\rangle_1 = -|\\psi\\rangle \\implies |\\psi\\rangle = 0` },
    { type: 'note', content: `The Pauli exclusion principle is a theorem, not an extra postulate: it follows directly from the antisymmetrization requirement for fermions. No two identical fermions can occupy the same quantum state. This is the basis of the periodic table, solid-state physics, and all of chemistry.` },
    { type: 'heading', text: 'The Spin-Statistics Theorem', anchor: 'spin-statistics' },
    { type: 'theorem', title: 'Spin-Statistics Theorem (Pauli 1940)', content: `In a Lorentz-covariant quantum field theory:` },
    { type: 'display', latex: `\\text{Integer spin} \\;\\Longleftrightarrow\\; \\text{Bosons (symmetric wave function)}` },
    { type: 'display', latex: `\\text{Half-integer spin} \\;\\Longleftrightarrow\\; \\text{Fermions (antisymmetric wave function)}` },
    { type: 'text', content: `This theorem cannot be proved within non-relativistic QM — it requires both special relativity and QFT. The proof ultimately relies on the fact that if half-integer spin fields were quantized with commutators (bosonic), the Hamiltonian would be unbounded below, making the vacuum unstable.` },
    { type: 'example', title: 'Helium Wavefunctions', content: `The two-electron helium ground state is a spin singlet (antisymmetric spin part). The spatial wave function must therefore be symmetric: $\\psi(r_1, r_2) = \\psi(r_2, r_1)$. The Pauli principle is why both electrons can be in the $n=1$ shell: they have opposite spins ($m_s = +1/2$ and $-1/2$).` },
    { type: 'shankar', content: `Shankar Ch. 10 treats identical particles and discusses the connection to QFT in an accessible way. The deeper proof of the spin-statistics theorem is given by Streater and Wightman in PCT, Spin and Statistics, and All That (from which this section\'s title is borrowed).` },
  ],
}

CONTENT['X'].sections['X-C'] = {
  title: 'Propagator in Elementary Cases',
  blocks: [
    { type: 'heading', text: 'Free Particle Propagator', anchor: 'free-particle-propagator' },
    { type: 'text', content: `For a free particle ($V = 0$), the path integral can be evaluated exactly by discretizing time and performing Gaussian integrals at each step.` },
    { type: 'theorem', title: 'Free-Particle Propagator', content: `The exact result is:`, latex: `K_0(x_f, T; x_i, 0) = \\sqrt{\\frac{m}{2\\pi i\\hbar T}}\\exp\\left[\\frac{im(x_f - x_i)^2}{2\\hbar T}\\right]` },
    { type: 'text', content: `This is the amplitude for a free particle to travel from $x_i$ to $x_f$ in time $T$. Note it has the form $e^{iS_{\\text{cl}}/\\hbar}$ times a prefactor — the classical action for a free particle is $S_{\\text{cl}} = m(x_f-x_i)^2/(2T)$.` },
    { type: 'text', content: `The free propagator is also a Gaussian in $x_f - x_i$. Starting from a point source ($x_i = 0$ at $t=0$, i.e., $\\psi(x,0) = \\delta(x)$), the probability density at later time $T$ is:` },
    { type: 'display', latex: `|K_0(x, T; 0, 0)|^2 = \\frac{m}{2\\pi\\hbar T}` },
    { type: 'text', content: `This is uniform — which makes sense: a position eigenstate has completely uncertain momentum, so all positions are equally likely at $t > 0$.` },
    { type: 'heading', text: 'Harmonic Oscillator Propagator', anchor: 'sho-propagator' },
    { type: 'text', content: `For the SHO with frequency $\\omega$, the path integral can also be evaluated exactly. The classical action for an SHO trajectory from $(x_i, 0)$ to $(x_f, T)$ is:` },
    { type: 'display', latex: `S_{\\text{cl}} = \\frac{m\\omega}{2\\sin(\\omega T)}\\left[(x_f^2 + x_i^2)\\cos(\\omega T) - 2x_f x_i\\right]` },
    { type: 'theorem', title: 'SHO Propagator', content: `The exact result is:`, latex: `K_{\\text{SHO}}(x_f, T; x_i, 0) = \\sqrt{\\frac{m\\omega}{2\\pi i\\hbar\\sin(\\omega T)}}\\exp\\left[\\frac{iS_{\\text{cl}}}{\\hbar}\\right]` },
    { type: 'text', content: `This result has poles at $T = n\\pi/\\omega$ (integer multiples of the half-period), reflecting the classical focusing of trajectories. At $T = 2\\pi/\\omega$ (one full period), the propagator returns to $\\delta(x_f - x_i)$ — the particle is back at its starting point.` },
    { type: 'shankar', content: `Shankar Ch. 8 derives both propagators in full detail. The Gaussian integrals involved are the same as those in statistical mechanics (imaginary-time path integrals = partition functions), making this a bridge to finite-temperature quantum mechanics.` },
  ],
}

CONTENT['X'].sections['X-D'] = {
  title: 'Momentum-Space Formulation',
  blocks: [
    { type: 'text', content: `The path integral can be reformulated in momentum space or as a phase-space integral over both $x(t)$ and $p(t)$. The phase-space formulation is more general and does not require the Lagrangian to be quadratic in $\\dot{x}$.` },
    { type: 'theorem', title: 'Phase-Space Path Integral', content: `The most general form of the path integral is:`, latex: `\\langle x_f|e^{-i\\hat{H}T/\\hbar}|x_i\\rangle = \\int \\mathcal{D}x\\,\\mathcal{D}p\\; \\exp\\left[\\frac{i}{\\hbar}\\int_0^T (p\\dot{x} - H(x,p))\\,dt\\right]` },
    { type: 'text', content: `Performing the Gaussian integral over $p$ (when $H = p^2/(2m) + V(x)$) recovers the Lagrangian path integral with $S = \\int (\\frac{1}{2}m\\dot{x}^2 - V)\\,dt$.` },
    { type: 'definition', title: 'Momentum-Space Propagator', content: `The propagator in momentum space is defined as:`, latex: `\\tilde{K}(p_f, T; p_i, 0) = \\int dx_f\\,dx_i\\,e^{-ip_f x_f/\\hbar}\\,K(x_f,T;x_i,0)\\,e^{ip_i x_i/\\hbar}` },
    { type: 'text', content: `For a free particle, the momentum-space propagator is simply $\\tilde{K}_0(p_f,T;p_i,0) = e^{-ip_f^2 T/(2m\\hbar)}\\delta(p_f - p_i)$, reflecting the fact that free-particle momentum is conserved.` },
    { type: 'note', content: `The path integral connects cleanly to quantum field theory: in QFT, one integrates over field configurations $\\phi(x,t)$ with weight $e^{iS[\\phi]/\\hbar}$, directly generalizing the particle path integral. This is one of the deepest structural reasons for studying path integrals.` },
  ],
}

CONTENT['XI'].sections['XI-A'] = {
  title: 'The Lorentz Group',
  blocks: [
    { type: 'text', content: `Special relativity requires physics to be covariant under Lorentz transformations. Before writing down a relativistic wave equation, we must understand the mathematical structure of the Lorentz group and its representations.` },
    { type: 'heading', text: 'Lorentz Transformations', anchor: 'lorentz-transformations' },
    { type: 'definition', title: 'The Lorentz Group', content: `The Lorentz group $\\text{O}(1,3)$ consists of linear transformations $x^\\mu \\to \\Lambda^\\mu{}_\\nu x^\\nu$ that preserve the Minkowski metric:`, latex: `\\eta_{\\mu\\nu} = \\text{diag}(+1,-1,-1,-1), \\qquad \\Lambda^\\mu{}_\\rho\\,\\eta_{\\mu\\nu}\\,\\Lambda^\\nu{}_\\sigma = \\eta_{\\rho\\sigma}` },
    { type: 'text', content: `The proper orthochronous Lorentz group $\\text{SO}^+(1,3)$ (det $\\Lambda = +1$, $\\Lambda^0{}_0 > 0$) includes pure boosts and rotations but not parity or time reversal.` },
    { type: 'heading', text: 'Generators and Lie Algebra', anchor: 'lorentz-generators' },
    { type: 'definition', title: 'Lorentz Generators', content: `The Lie algebra $\\mathfrak{so}(1,3)$ has 6 generators: $J_i$ (rotations) and $K_i$ (boosts). Their commutation relations:`, latex: `[J_i, J_j] = i\\epsilon_{ijk}J_k,\\quad [J_i, K_j] = i\\epsilon_{ijk}K_k,\\quad [K_i, K_j] = -i\\epsilon_{ijk}J_k` },
    { type: 'text', content: `Define $A_i = (J_i + iK_i)/2$ and $B_i = (J_i - iK_i)/2$. Then $[A_i, A_j] = i\\epsilon_{ijk}A_k$, $[B_i, B_j] = i\\epsilon_{ijk}B_k$, $[A_i, B_j] = 0$. The Lorentz algebra decomposes as $\\mathfrak{su}(2) \\oplus \\mathfrak{su}(2)$.` },
    { type: 'definition', title: 'Representations $(j_A, j_B)$', content: `Each irreducible representation of the Lorentz group is labeled by $(j_A, j_B)$ where $j_A, j_B \\in \\{0, \\frac{1}{2}, 1, \\ldots\\}$:` },
    { type: 'display', latex: `(0,0): \\text{scalar}, \\quad (\\tfrac{1}{2},0): \\text{left-handed Weyl spinor}, \\quad (0,\\tfrac{1}{2}): \\text{right-handed Weyl spinor}` },
    { type: 'display', latex: `(\\tfrac{1}{2},\\tfrac{1}{2}): \\text{4-vector}, \\quad (\\tfrac{1}{2},0)\\oplus(0,\\tfrac{1}{2}): \\text{Dirac spinor}` },
    { type: 'text', content: `The Dirac equation lives in the $(\\frac{1}{2},0) \\oplus (0,\\frac{1}{2})$ representation, which is why the spinor has 4 components.` },
    { type: 'note', content: `Unlike $\\text{SU}(2)$, the Lorentz group is non-compact, so its finite-dimensional representations are not unitary. For quantum mechanics (where observables require unitary representations), one uses the *infinite-dimensional* unitary representations, which are labeled by mass and spin.` },
    { type: 'shankar', content: `Shankar Appendix B gives a self-contained introduction to the Lorentz group. For deeper study, see Weinberg's "The Quantum Theory of Fields" Vol. 1, Chapter 2, which constructs representations from little groups.` },
  ],
}

// Merge checks into existing sections
for (const [secId, checkArr] of Object.entries(CHECKS)) {
  // find which unit this section belongs to
  for (const [unitId, unitData] of Object.entries(CONTENT)) {
    if (unitData.sections && unitData.sections[secId]) {
      unitData.sections[secId].checks = checkArr
      break
    }
  }
}

// Add heading anchors to content sections for subsection navigation
// (subsection slugs match these anchors)
function addHeadings(sectionData, headings) {
  if (!sectionData || !headings) return
  for (const { after, text, anchor } of headings) {
    const idx = sectionData.blocks.findIndex(b => b.content && b.content.includes(after))
    if (idx >= 0) {
      sectionData.blocks.splice(idx, 0, { type: 'heading', text, anchor })
    }
  }
}

export const getUnitContent = (unitId) => CONTENT[unitId] || null
export const getSectionContent = (unitId, sectionId) => CONTENT[unitId]?.sections[sectionId] || null
