# Op-Amp (Ideal)

An ideal op-amp is a 3-terminal component that has infinite open-loop gain:

Vo = A_OL(V+ - V-)

A_OL = +inf

In practice, this resolves into the following properties of an ideal op-amp:

- A_OL = +inf
- V+ = V-
- Vo != 0
- Rin = +inf
- Rout = 0

Real op-amps have some restrictions. For instance, an op-amp cannot output infinite voltages.
We will often add the following constraint:
- VCC- \< Vo \< VCC+

In addition, (we often ignore these for analysis):
- A_OL is very large (not infinity)
- There can be a small input current
- Output impedance can be nonzero.