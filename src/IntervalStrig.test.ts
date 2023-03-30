import { describe, expect, test } from "@jest/globals";
import Interval from "./Interval.class";
import Point from "./Point.class";

describe("Interval Endpoints", () => {
  const BEFORE = "a",
    START = "b",
    DURING = "c",
    END = "d",
    AFTER = "e";
  const interval = new Interval([START, END]);
  const StartsBeforeEndsBefore = new Interval([BEFORE, BEFORE]);
  const StartsWithEndsOnStart = new Interval([START, START]);
  const StartsDuringEndsSuring = new Interval([DURING, DURING]);
  const StartsOnEndEndsWith = new Interval([END, END]);
  const StartsAfterEndsAfter = new Interval([AFTER, AFTER]);

  test("should create an interval", () => {
    expect(interval.start).toBeInstanceOf(Point);
    expect(interval.end).toBeInstanceOf(Point);
  });

  test("should determine if it starts before another interval", () => {
    expect(StartsBeforeEndsBefore.startsBefore(interval)).toBe(true);
  });

  test("should determine if it starts with another interval", () => {
    expect(StartsWithEndsOnStart.startsWith(interval)).toBe(true);
  });

  test("should determine if it starts during another interval", () => {
    expect(StartsDuringEndsSuring.startsDuring(interval)).toBe(true);
  });

  test("should determine if it starts on the end of another interval", () => {
    expect(StartsOnEndEndsWith.startsOnEnd(interval)).toBe(true);
  });

  test("should determine if it starts after another interval", () => {
    expect(StartsAfterEndsAfter.startsAfter(interval)).toBe(true);
  });

  test("should determine if it ends before another interval", () => {
    expect(StartsBeforeEndsBefore.endsBefore(interval)).toBe(true);
  });

  test("should determine if it ends on the start of another interval", () => {
    expect(StartsWithEndsOnStart.endsOnStart(interval)).toBe(true);
  });

  test("should determine if it ends during another interval", () => {
    expect(StartsDuringEndsSuring.endsDuring(interval)).toBe(true);
  });

  test("should determine if it ends with another interval", () => {
    expect(StartsOnEndEndsWith.endsWith(interval)).toBe(true);
  });

  test("should determine if it ends after another interval", () => {
    expect(StartsAfterEndsAfter.endsAfter(interval)).toBe(true);
  });
});

describe("Interval", () => {
  const BEFORE = "a",
    START = "b",
    DURING = "c",
    END = "d",
    AFTER = "e";
  const interval = new Interval([START, END]);
  const preceedes = new Interval([BEFORE, BEFORE]);
  const meets = new Interval([BEFORE, START]);
  const overlaps = new Interval([BEFORE, DURING]);
  const starts = new Interval([START, DURING]);
  const contains = new Interval([BEFORE, AFTER]);
  const finishes = new Interval([DURING, END]);
  const equals = new Interval([START, END]);
  test("should determine if it preceedes another interval", () => {
    expect(preceedes.preceedes(interval)).toBe(true);
  });
  test("should determine if it is preceeded by another interval", () => {
    expect(interval.isPreceededBy(preceedes)).toBe(true);
  });
  test("should determine if it meets another interval", () => {
    expect(meets.meets(interval)).toBe(true);
  });
  test("should determine if it is met by another interval", () => {
    expect(interval.isMetBy(meets)).toBe(true);
  });
  test("should determine if it overlaps interval", () => {
    expect(overlaps.overlaps(interval)).toBe(true);
  });
  test("should determine if it is overlapped by another interval", () => {
    expect(interval.isOverlapedBy(overlaps)).toBe(true);
  });
  test("should determine if it starts interval", () => {
    expect(starts.starts(interval)).toBe(true);
  });
  test("should determine if it is started by another interval", () => {
    expect(interval.isStartedBy(starts)).toBe(true);
  });
  test("should determine if it contains interval", () => {
    expect(contains.contains(interval)).toBe(true);
  });
  test("should determine if it is cointained by another interval", () => {
    expect(interval.isContainedBy(contains)).toBe(true);
  });
  test("should determine if it finishes interval", () => {
    expect(finishes.finishes(interval)).toBe(true);
  });
  test("should determine if it is finished by another interval", () => {
    expect(interval.isFinishedBy(finishes)).toBe(true);
  });
  test("should determine if it is equal another interval", () => {
    expect(equals.equals(interval)).toBe(true);
    expect(interval.equals(equals)).toBe(true);
  });
});