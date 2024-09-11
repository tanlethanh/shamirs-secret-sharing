import { isUint8 } from '../utils/number';

export function gfAdd(a: number, b: number): number {
	if (!isUint8(a) || !isUint8(b))
		throw Error('invalid number to add in GF(2^8)');

	return a ^ b;
}

/**
 * Polynomial multiplication in GF(2^8)
 * The Polynomial multiplication over bit explanation: https://en.wikipedia.org/wiki/Finite_field_arithmetic#:~:text=Multiplication%20in%20this,value%200x1b%20appropriately.
 * An explanation of binary multiplication: https://www.cuemath.com/numbers/binary-multiplication/
 */
export function gfMul(a: number, b: number): number {
	if (!isUint8(a) || !isUint8(b))
		throw Error('invalid number to multiply in GF(2^8)');

	let p = 0;

	while (a && b) {
		if (b & 1) p = p ^ a;
		b = b >> 1;
		const carry = a >> 7;
		a = a << 1;
		if (carry) a = a ^ 0x11b;
	}

	return p;
}

/**
 * Polynomial multiplicative inverse
 * In finite field GF(p^m), a^(p^n - 1) = 1 => a^-1 = a^(p^n - 2) (a != 0)
 * https://en.wikipedia.org/wiki/Finite_field_arithmetic#Composite_field:~:text=Multiplicative%20inverse%5B,%5B6%5D
 */
export function gfInverse(a: number): number {
	if (!isUint8(a)) throw Error('invalid number to inverse in GF(2^8)');

	let b = gfMul(a, a); // a^2
	let c = gfMul(a, b); // a^3
	b = gfMul(c, c); // a^6
	b = gfMul(b, b); // a^12
	c = gfMul(b, c); // a^15
	b = gfMul(b, b); // a^24
	b = gfMul(b, b); // a^48
	b = gfMul(b, c); // a^63
	b = gfMul(b, b); // a^126
	b = gfMul(a, b); // a^127
	b = gfMul(b, b); // a^254

	return b;
}

export function gfDiv(a: number, b: number): number {
	if (!isUint8(a) || !isUint8(b))
		throw Error('invalid number to divide in GF(2^8)');
	if (b === 0) throw Error('can not divide by 0');
	else if (a === 0) return 0;

	return gfMul(a, gfInverse(b));
}
