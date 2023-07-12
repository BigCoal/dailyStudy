interface ClockConstructor {
  currentTime: Date;
  //   new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) {}
}
