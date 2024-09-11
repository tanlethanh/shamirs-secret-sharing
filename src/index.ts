import { reconstruct, split } from './sss-28';

const secretStr = 'helloworld';
const secret = new Uint8Array(Buffer.from(secretStr, 'utf-8'));

console.log('secret', secret.toString());

const shares = split(secret, 2, 2);

console.log(
	'shares',
	shares.map((s) => s.toString()),
);

const reSecret = reconstruct(shares);

console.log('reSecret', reSecret.toString());

const reSecretStr = Buffer.from(reSecret).toString('utf-8');

console.log(secretStr, reSecretStr);
