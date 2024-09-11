/**
 * Shamir's Secret Sharing in finite field GF(2^8) - extension fields GF(p^m).
 *
 * In this finite field, the element range is 0 -> 255 (decimal), and each element represents a byte.
 *
 * - Irreducible polynomial P(x) = x^8 + x^4 + x^3 + x + 1 => 100011011 = 283 = 0x11B, it's used for `finite field arithmetic`
 * - Evaluating polynomial uses Horner's method
 */

import { getRandomValues } from 'crypto';

import { isUint8 } from '../utils/number';
import { gfAdd, gfDiv, gfMul } from './math';

type Polynomial = {
	coefficients: Uint8Array;
};

export function createRandomPolynomial(
	intercept: number,
	degree: number,
): Polynomial {
	if (!isUint8(intercept)) throw Error("'intercept' must be an uint8 value");
	else if (!isUint8(degree)) throw Error("'degree' must be an uint8 value");

	const polynomial: Polynomial = {
		coefficients: new Uint8Array(degree + 1),
	};

	getRandomValues(polynomial.coefficients);
	polynomial.coefficients[0] = intercept;

	return polynomial;
}

/**
 * Evaluate the value of polynomial for the given x using Horner's method
 */
export function evaluate(polynomial: Polynomial, x: number): number {
	if (x === 0) return polynomial.coefficients[0];

	const degree = polynomial.coefficients.length - 1;

	let result = polynomial.coefficients[degree];
	for (let i = degree - 1; i >= 0; i--) {
		const ce = polynomial.coefficients[i];
		result = gfAdd(gfMul(result, x), ce);
	}

	return result;
}

/**
 * Get the secret (intercept = f(0)) by optimized lagrange interpolating polynomial: https://en.wikipedia.org/wiki/Shamir%27s_secret_sharing#Reconstruction:~:text=Reconstruction%5Bedit,defined%20as%20follows%3A
 */
export function reconstructSecret(xs: number[], ys: number[]): number {
	if (xs.length !== ys.length)
		throw Error('xs and ys must have the same length to represent points');

	let secret = 0;
	for (let i = 0; i < ys.length; i++) {
		let base = 1;
		for (let j = 0; j < xs.length; j++) {
			if (i === j) continue;
			base = gfMul(base, gfDiv(xs[j], gfAdd(xs[j], xs[i])));
		}

		secret = gfAdd(secret, gfMul(ys[i], base));
	}

	return secret;
}
