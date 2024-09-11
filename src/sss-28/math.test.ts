import { gfMul } from './math';

describe('test gfMul', () => {
	it('simple gfMul', () => {
		let a = 13;
		let b = 6;
		let ab = gfMul(a, b);
		expect(ab).toEqual(46);

		a = 244;
		b = 6;
		ab = gfMul(a, b);
		expect(ab).toEqual(14);

		a = 32;
		b = 48;
		ab = gfMul(a, b);
		expect(ab).toEqual(90);
	});
});
