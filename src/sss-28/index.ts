import { isUint8 } from '../utils/number';
import {
	createRandomPolynomial,
	evaluate,
	reconstructSecret,
} from './polynomial';

/**
 * [y0, y1, ..., yN, x], N is equal to length of secret - 1, share length = N + 1
 */
export type Share = Uint8Array;

export function split(
	secret: Uint8Array,
	threshold: number,
	numShares: number,
): Uint8Array[] {
	if (!isUint8(threshold)) throw Error("'threshold' must be uint8 value");
	if (!isUint8(numShares)) throw Error("'numShares' must be uint8 value");
	if (threshold < 2) throw Error("'threshold can't less than 2'");
	if (numShares < threshold)
		throw Error("'numShares' can't less than 'threshold'");

	const xs = new Uint8Array(numShares);
	crypto.getRandomValues(xs);

	const shares: Share[] = new Array<Share>(numShares);
	for (let i = 0; i < numShares; i++) {
		shares[i] = new Uint8Array(secret.length + 1);
		shares[i][secret.length] = xs[i];
	}

	for (let i = 0; i < secret.length; i++) {
		const polynomial = createRandomPolynomial(secret[i], threshold - 1);
		for (let j = 0; j < numShares; j++) {
			const x = xs[j];
			const y = evaluate(polynomial, x);
			shares[j][i] = y;
		}
	}

	return shares;
}

export function reconstruct(shares: Share[]): Uint8Array {
	if (shares.length < 2)
		throw Error('require at least 2 shares to reconstruct');
	if (shares.some((s) => s.length != shares[0].length))
		throw Error('all shares must have the same length');

	const secretLength = shares[0].length - 1;
	const secret = new Uint8Array(secretLength);

	for (let i = 0; i < secret.length; i++) {
		const xs = shares.map((s) => s[secret.length]);
		const ys = shares.map((s) => s[i]);
		secret[i] = reconstructSecret(xs, ys);
	}

	return secret;
}
