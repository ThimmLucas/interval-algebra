import CompareFunction from "./ComparingFunction";
import Point from "./Point.class";

export default class Interval<t> {
  readonly start: Point<t>;
  readonly end: Point<t>;

  constructor(
    [a, b]: [t, t],
    private readonly compareFunction: CompareFunction<t> = (a, b) =>
      a == b ? 0 : Number(a > b) * 2 - 1
  ) {
    this.start = new Point(a, this.compareFunction);
    this.end = new Point(b, this.compareFunction);
  }

  get inverted() {
    return this.end && this.start
      ? this.end.lt(this.start, this.compareFunction)
      : false;
  }

  startsBefore(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.start.isBefore(interval, compareFunction);
  }
  startsWith(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.start.isStart(interval, compareFunction);
  }
  startsDuring(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.start.isDuring(interval, compareFunction);
  }
  startsOnEnd(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.start.isEnd(interval, compareFunction);
  }
  startsAfter(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.start.isAfter(interval, compareFunction);
  }

  endsBefore(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.end.isBefore(interval, compareFunction);
  }
  endsOnStart(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.end.isStart(interval, compareFunction);
  }
  endsDuring(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.end.isDuring(interval, compareFunction);
  }
  endsWith(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.end.isEnd(interval, compareFunction);
  }
  endsAfter(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return this.end.isAfter(interval, compareFunction);
  }

  preceedes(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsBefore(interval, compareFunction) &&
      this.endsBefore(interval, compareFunction)
    );
  }
  isPreceededBy(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsAfter(interval, compareFunction) &&
      this.endsAfter(interval, compareFunction)
    );
  }

  meets(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsBefore(interval, compareFunction) &&
      this.endsOnStart(interval, compareFunction)
    );
  }
  isMetBy(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsOnEnd(interval, compareFunction) &&
      this.endsAfter(interval, compareFunction)
    );
  }

  overlaps(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsBefore(interval, compareFunction) &&
      this.endsDuring(interval, compareFunction)
    );
  }
  isOverlapedBy(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsDuring(interval, compareFunction) &&
      this.endsAfter(interval, compareFunction)
    );
  }

  starts(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsWith(interval, compareFunction) &&
      this.endsDuring(interval, compareFunction)
    );
  }
  isStartedBy(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsWith(interval, compareFunction) &&
      this.endsAfter(interval, compareFunction)
    );
  }

  contains(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsBefore(interval, compareFunction) &&
      this.endsAfter(interval, compareFunction)
    );
  }
  isContainedBy(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsDuring(interval, compareFunction) &&
      this.endsDuring(interval, compareFunction)
    );
  }

  finishes(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsDuring(interval, compareFunction) &&
      this.endsWith(interval, compareFunction)
    );
  }
  isFinishedBy(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsBefore(interval, compareFunction) &&
      this.endsWith(interval, compareFunction)
    );
  }

  equals(interval: Interval<t>, compareFunction?: CompareFunction<t>) {
    return (
      this.startsWith(interval, compareFunction) &&
      this.endsWith(interval, compareFunction)
    );
  }
}
