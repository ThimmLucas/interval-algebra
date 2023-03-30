import { describe, expect, test } from '@jest/globals';
import CompareFunction from './ComparingFunction';
import Point from './Point.class';

describe('Point module', () => {
    const dataNum = [1, 2, 3]
    const dataStr = ["a", "b", "c"]
    const dataObj = [{ a: 1, b: 3 }, { a: 2, b: 2 }, { a: 3, b: 1 }]
    const objCompareFunctionA: CompareFunction<typeof dataObj[number]> = (a, b) => a.a == b.a ? 0 : (Number(a.a > b.a) * 2 - 1)
    const objCompareFunctionB: CompareFunction<typeof dataObj[number]> = (a, b) => a.b == b.b ? 0 : (Number(a.b > b.b) * 2 - 1)

    const [NumericPoint1, NumericPoint2, NumericPoint3] = dataNum.map(v => new Point(v))
    const [StringPoint1, StringPoint2, StringPoint3] = dataStr.map(v => new Point(v))
    const [ObjectPoint1, ObjectPoint2, ObjectPoint3] = dataObj.map(v => new Point(v, objCompareFunctionA))


    test('Expects point to be created with data', () => {
        expect(NumericPoint1.data).toBe(dataNum[0])
        expect(StringPoint1.data).toBe(dataStr[0])
        expect(ObjectPoint1.data).toBe(dataObj[0])
    });

    test('Points relations', () => {
        expect(NumericPoint1.relates(NumericPoint2)).toBe("lt")
        expect(NumericPoint3.relates(NumericPoint2)).toBe("gt")
        expect(NumericPoint1.relates(new Point(dataNum[0]))).toBe("eq")

        expect(StringPoint1.relates(StringPoint2)).toBe("lt")
        expect(StringPoint3.relates(StringPoint2)).toBe("gt")
        expect(StringPoint1.relates(new Point(dataStr[0]))).toBe("eq")
        
        expect(ObjectPoint1.relates(ObjectPoint2)).toBe("lt")
        expect(ObjectPoint3.relates(ObjectPoint2)).toBe("gt")
        expect(ObjectPoint1.relates(new Point(dataObj[0]))).toBe("eq")
        
        expect(ObjectPoint1.relates(ObjectPoint2, objCompareFunctionB)).toBe("gt")
        expect(ObjectPoint3.relates(ObjectPoint2, objCompareFunctionB)).toBe("lt")
        expect(ObjectPoint1.relates(new Point(dataObj[0]), objCompareFunctionB)).toBe("eq")
    });
});