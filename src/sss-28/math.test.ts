import { gfAdd, gfDiv, gfInverse, gfMul } from './math';

describe('test GF(2^8) arithmetic', () => {
	it('invalid value gfAdd', () => {
		expect(() => gfAdd(256, 6)).toThrow(Error);
		expect(() => gfAdd(77, 312)).toThrow(Error);
	});

	it('simple gfAdd', () => {
		expect(gfAdd(49, 33)).toEqual(16);
		expect(gfAdd(251, 123)).toEqual(128);
		expect(gfAdd(129, 45)).toEqual(172);
	});

	it('invalid value gfMul', () => {
		expect(() => gfMul(256, 6)).toThrow(Error);
		expect(() => gfMul(77, 312)).toThrow(Error);
	});

	it('simple gfMul', () => {
		expect(gfMul(13, 6)).toEqual(46);
		expect(gfMul(244, 6)).toEqual(14);
		expect(gfMul(32, 48)).toEqual(90);
	});

	it('invalid value gfInverse', () => {
		expect(() => gfInverse(257)).toThrow(Error);
	});

	// could use inverse table in GF(2^8) for test cases
	it('simple gfInverse', () => {
		expect(gfInverse(0xcc)).toEqual(0x1b);
		expect(gfInverse(0x9d)).toEqual(0xdc);
		expect(gfInverse(0x67)).toEqual(0x43);
	});

	it('invalid value gfDiv', () => {
		expect(() => gfDiv(300, 12)).toThrow(Error);
		expect(() => gfDiv(11, 400)).toThrow(Error);
	});

	it('simple gfDiv', () => {
		expect(gfDiv(16, 3)).toEqual(249);
		expect(gfDiv(203, 54)).toEqual(148);
		expect(gfDiv(111, 143)).toEqual(207);
	});
});
