import { createCipheriv } from "crypto"
import { uint8ArrayToBits } from "../utils"
import { loadCircuit } from "./utils"

describe('AES circuits Tests', () => {

	it('should encrypt an AES-256-CTR block', async() => {
		const circuit = await loadCircuit('aes-256-ctr')

		const vectors = [
			{
				keyBytes: Buffer.from(
					[
						0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
						0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
					]
				),
				nonceBytes: Buffer.from(
					[
						0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
					]
				),
				counter: 2,
				plaintextBytes: Buffer.from(
					[
						0x24, 0xd7, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x3f, 0x62, 0x77, 0x46,
						0x6a, 0x6c, 0x54, 0x79, 0x30, 0x51, 0x47, 0x39, 0x77, 0x5a, 0x57, 0x35, 0x5a, 0x63, 0x32, 0x47,
						0x75, 0x59, 0x32, 0x39, 0x74, 0x6c, 0x48, 0x76, 0x54, 0x79, 0x77, 0x4d, 0x74, 0x4d, 0x74, 0x69,
						0x34, 0x51, 0x67, 0x39, 0x57, 0x5a, 0x77, 0x35, 0x7a, 0x63, 0x32, 0x67, 0x75, 0x59, 0x32, 0x39,
						0x74, 0x6c, 0x47, 0x48, 0x54, 0x59, 0x57, 0x6d, 0x74, 0x63, 0x32, 0x48, 0x3f, 0x68, 0x4d, 0x49,
						0x30, 0x79, 0x6e, 0x54, 0x59, 0x73, 0x41, 0x47, 0x31, 0x48, 0x59, 0x79, 0x31, 0x7a, 0x61, 0x67,
						0x65, 0x79, 0x6c, 0x54, 0x55, 0x78, 0x4d, 0x49, 0x58, 0x4f, 0x62, 0x57, 0x66, 0x4a, 0x4c, 0x58,
						0x4e, 0x4f, 0x59, 0x74, 0x65, 0x53, 0x61, 0x47, 0x31, 0x48, 0x59, 0x79, 0x31, 0x74, 0x5a, 0x44,
						0x55, 0x74, 0x5a, 0x78, 0x52, 0x54, 0x71, 0x67, 0x39, 0x77, 0x7a, 0x57, 0x3f, 0x35, 0x5a, 0x43,
						0x32, 0x67, 0x75, 0x79, 0x32, 0x39, 0x74, 0x6c, 0x47, 0x48, 0x54, 0x79, 0x57, 0x4d, 0x74, 0x63,
						0x4d, 0x4c, 0x57, 0x7a, 0x77, 0x31, 0x6b, 0x4d, 0x54, 0x59, 0x57, 0x6c, 0x77, 0x56, 0x30, 0x62,
						0x55, 0x62, 0x76, 0x63, 0x47, 0x76, 0x55, 0x43, 0x33, 0x4e, 0x6f, 0x4c, 0x4d, 0x6e, 0x56, 0x62,
						0x73, 0x58, 0x4f, 0x62, 0x77, 0x66, 0x4a, 0x4c, 0x78, 0x6e, 0x6f, 0x59, 0x14, 0x74, 0x45, 0x54,
						0x4f, 0x74, 0x79, 0x74, 0x7a, 0x78, 0x52, 0x54, 0x71, 0x67, 0x39, 0x57, 0x5a, 0x57, 0x35, 0x7a,
						0x63, 0x01, 0x38, 0x01, 0x66, 0x01, 0x31, 0x05, 0x31, 0x33, 0x39, 0x34, 0x30, 0x06, 0x74, 0x55,
						0x4e, 0x4e, 0x65, 0x4c, 0x07, 0x65, 0x58, 0x41, 0x6d, 0x70, 0x4c, 0x45, 0x03, 0x4f, 0x72, 0x67,
						0x00, 0x00, 0x05, 0x00, 0x01, 0x00, 0x0c, 0x00, 0xf7, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
					]
				),
				expectedCipherTextBytes: Buffer.from(
					[
						0x63, 0xd5, 0xd7, 0x1b, 0xc5, 0xe4, 0xc2, 0x1b, 0x8d, 0x41, 0x97, 0x8a, 0x8e, 0x8b, 0x0f, 0x2b,
						0xe9, 0xba, 0xd3, 0x4d, 0xc0, 0x2a, 0x18, 0x45, 0x4f, 0x3d, 0xb2, 0xb0, 0x47, 0x0a, 0x32, 0xf5,
						0x74, 0x49, 0x9c, 0xc5, 0xdb, 0xad, 0x5a, 0xee, 0x20, 0xdd, 0x08, 0xa0, 0xfc, 0xca, 0x5c, 0x51,
						0xda, 0x08, 0x07, 0xb4, 0x0d, 0x8c, 0xd4, 0xef, 0x45, 0xf4, 0x18, 0x7e, 0x6d, 0xba, 0xc7, 0xd7,
						0x84, 0x50, 0x81, 0x32, 0x87, 0x88, 0x71, 0x0c, 0x68, 0x37, 0x98, 0x26, 0xd0, 0xe7, 0x43, 0xa1,
						0x08, 0xf3, 0xa7, 0x36, 0x2f, 0x10, 0x12, 0x2f, 0xcc, 0xb5, 0xc7, 0xb5, 0x49, 0x8a, 0xd8, 0xea,
						0xae, 0x81, 0x35, 0xb2, 0xf1, 0x39, 0x85, 0x53, 0xc6, 0x53, 0x5c, 0xe5, 0x2e, 0x3f, 0x6d, 0x27,
						0xf4, 0x28, 0x3b, 0xdf, 0x86, 0x96, 0x44, 0xdd, 0x7c, 0xb7, 0x0e, 0xb4, 0xb3, 0x92, 0x34, 0x4a,
						0xee, 0x26, 0x5a, 0xbe, 0xe6, 0x83, 0xba, 0x34, 0x31, 0x96, 0x32, 0xf6, 0x02, 0xef, 0x16, 0x81,
						0x04, 0x93, 0x96, 0x4c, 0x07, 0x28, 0xe7, 0x26, 0xcb, 0x17, 0xbc, 0x0e, 0xad, 0x9f, 0x9d, 0x8d,
						0xde, 0xdb, 0xc9, 0x6f, 0x9e, 0xce, 0xa7, 0x33, 0xf3, 0x3a, 0x8a, 0x96, 0xa8, 0xd6, 0xb6, 0xd9,
						0xc8, 0xac, 0xbc, 0x41, 0xcc, 0xdd, 0x26, 0xff, 0x56, 0x91, 0xaf, 0x8b, 0x3c, 0xab, 0xe1, 0x91,
						0x60, 0x14, 0xc5, 0x98, 0x7a, 0xbb, 0x9c, 0x85, 0x4f, 0x38, 0xbc, 0xbf, 0xae, 0x35, 0x9c, 0xd0,
						0xae, 0x0a, 0x81, 0x02, 0x47, 0x78, 0xe8, 0xa5, 0x00, 0xf6, 0xa3, 0x90, 0x1b, 0x1f, 0xba, 0x80,
						0x20, 0x22, 0xec, 0xae, 0x80, 0x21, 0x32, 0x20, 0x63, 0x74, 0x81, 0x3c, 0x85, 0x17, 0x08, 0x04,
						0xe6, 0xdd, 0xdc, 0x39, 0x9a, 0x55, 0xd1, 0xe4, 0x7a, 0x1b, 0x2b, 0x36, 0x88, 0xd3, 0x30, 0xe6,
						0x14, 0xd1, 0xf7, 0x90, 0x9c, 0xda, 0x44, 0x3e, 0x80, 0xdf, 0x72, 0x07, 0xb7, 0x2d, 0x3a, 0x0a,
						0xda, 0xb4, 0xca, 0xcd, 0x80, 0x8b, 0x81, 0xaf, 0x71, 0x2f, 0x6d, 0x51, 0x0a, 0xf4, 0xba, 0x4b,
						0x01, 0x03, 0xde, 0x48, 0xba, 0xc5, 0xce, 0x17, 0x92, 0x3c, 0x3a, 0x5a, 0x0a, 0x95, 0xa0, 0xd3,
						0x98, 0xca, 0x5b, 0x5e, 0x49, 0x94, 0xcf, 0x17, 0x98, 0x31, 0x1d, 0x16, 0x97, 0x3d, 0x45, 0xe9,
						0xc9, 0x95, 0x7f, 0x2a, 0x8b, 0x60, 0x78, 0xe9, 0xa3, 0xe0, 0x7b, 0x20, 0x5d, 0xd3, 0x1d, 0x62,
						0x93, 0x1a, 0xd7, 0x84, 0x9c, 0x14, 0x85, 0x08, 0x49, 0xa3, 0x78, 0x66, 0x8d, 0xb1, 0x48, 0xff,
						0x59, 0x2f, 0xf9, 0xd9, 0x85, 0x54, 0x72, 0xcb, 0x20, 0xaf, 0xa4, 0x23, 0x97, 0xb5, 0x62, 0x28,
						0x84, 0xfd, 0x1f, 0x79, 0xee, 0xf1, 0x00, 0xc1, 0x9f, 0xe5, 0x34, 0xdc, 0xdc, 0x57, 0x59, 0x32,
						0xa5, 0x83, 0xc0, 0xd9, 0x87, 0x07, 0xd3, 0xdc, 0xa1, 0x70, 0xfe, 0x7f, 0x3e, 0x40, 0x12, 0x87,
						0xe2, 0x0b, 0x6c, 0xbb, 0x9f, 0x20, 0x52, 0xd4, 0x3d, 0x10, 0xde, 0x46, 0x4d, 0xe6, 0xbb, 0x56,
						0x19, 0x7a, 0x57, 0x6b, 0xc3, 0xd1, 0x51, 0x72, 0xa0, 0xb8, 0xdc, 0x52, 0xff, 0xf8, 0xb0, 0xa5,
						0x5d, 0x6b, 0x44, 0x12, 0x1c, 0x83, 0x20, 0xe5, 0xe7, 0xb9, 0xe3, 0xed, 0x86, 0xab, 0x1f, 0x78,
						0x7a, 0x7a, 0xae, 0xdd, 0xae, 0x57, 0xbf, 0x7d, 0xeb, 0x1a, 0xe0, 0x57, 0xf1, 0x94, 0xd5, 0x51,
						0x69, 0x8a, 0x6b, 0x52, 0xc3, 0x9a, 0x1e, 0x3c, 0x43, 0xc5, 0xba, 0xb0, 0x11, 0xff, 0x86, 0xb4,
						0x19, 0xef, 0x29, 0x01, 0x97, 0x93, 0xdf, 0xce, 0x51, 0xaa, 0x04, 0x8d, 0xe8, 0xac, 0xed, 0x80,
						0x90, 0xac, 0xd1, 0x9a, 0x3d, 0xae, 0xe1, 0x20, 0xb7, 0x02, 0x91, 0x5d, 0xc7, 0xe8, 0x53, 0x1c,
					]
				),
			}
		]

		for(const {
			keyBytes,
			nonceBytes,
			plaintextBytes,
			counter,
			expectedCipherTextBytes
		} of vectors) {
			const cipher = createCipheriv('aes-256-gcm', keyBytes, nonceBytes)
			const ciphertextBytes = Buffer.concat([
				cipher.update(plaintextBytes),
				cipher.final()
			])

			if (Buffer.compare(ciphertextBytes, expectedCipherTextBytes) !== 0) {
				throw new Error("error: Ciphertext not matched")
			}

			const ciphertextBits = uint8ArrayToBits(ciphertextBytes)
			const plaintextBits = uint8ArrayToBits(plaintextBytes)
			const iv = getFullIv(nonceBytes, counter)
			const w = await circuit.calculateWitness({
				K1: uint8ArrayToBits(keyBytes),
				CTR: uint8ArrayToBits(iv),
				MSG: plaintextBits,
			})
			
			await circuit.checkConstraints(w)
			await circuit.assertOut(w, {
				CT: ciphertextBits
			})
		}
	}, 60000)

	function getFullIv(nonce: Uint8Array, counter: number) {
		const iv = Buffer.alloc(16)
		iv.set(nonce, 0)
		iv.writeUInt32BE(counter, 12)

		return iv
	}
})
