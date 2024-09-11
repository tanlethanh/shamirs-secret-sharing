export function isUint8(value: number) {
	if (!Number.isInteger(value)) return false;
	else if (value < 0 || value > 255) return false;

	return true;
}
