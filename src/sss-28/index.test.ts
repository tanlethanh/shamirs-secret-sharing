import { reconstruct, split } from './index';

describe('test split/reconstruct with SSS in GF(2^8)', () => {
	it('simple key string', () => {
		const secretStr = 'helloworld';
		const secret = new Uint8Array(Buffer.from(secretStr, 'utf-8'));

		const shares = split(secret, 2, 2);
		const reSecret = reconstruct(shares);
		const reSecretStr = Buffer.from(reSecret).toString('utf-8');

		expect(reSecretStr).toEqual(secretStr);
	});
});
