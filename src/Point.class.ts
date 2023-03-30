import CompareFunction from "./ComparingFunction";
import Interval from "./Interval.class";

export default class Point<t> {
  constructor(
    private readonly _data: t,
    private readonly compareFunction: CompareFunction<t> = (a, b) =>
      a == b ? 0 : Number(a > b) * 2 - 1
  ) {}

  get data(): t {
    return this._data;
  }

  // Less than
  lt(point: Point<t>, compareFunction?: CompareFunction<t>): boolean {
    return (compareFunction || this.compareFunction)(this.data, point.data) < 0;
  }
  // Equals
  eq(point: Point<t>, compareFunction?: CompareFunction<t>): boolean {
    return (
      (compareFunction || this.compareFunction)(this.data, point.data) == 0
    );
  }
  // Greater Than
  gt(point: Point<t>, compareFunction?: CompareFunction<t>): boolean {
    return (compareFunction || this.compareFunction)(this.data, point.data) > 0;
  }

  relates(
    point: Point<t>,
    compareFunction?: CompareFunction<t>
  ): "lt" | "eq" | "gt" | undefined {
    if (this.lt(point, compareFunction)) return "lt";
    else if (this.eq(point, compareFunction)) return "eq";
    else if (this.gt(point, compareFunction)) return "gt";
  }

  isBefore(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.lt(interval.start, compareFunction);
  }
  isStart(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.eq(interval.start, compareFunction);
  }
  isDuring(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.gt(interval.start, compareFunction) &&
      this.lt(interval.end, compareFunction)
    );
  }
  isEnd(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.eq(interval.end, compareFunction);
  }
  isAfter(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.gt(interval.end, compareFunction);
  }
}
