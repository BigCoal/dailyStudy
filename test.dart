import 'dart:async';

void main() {
  scheduleTimeout(1 * 1000); // 5 seconds.
}

Timer scheduleTimeout([int milliseconds = 10000]) =>
    Timer.periodic(Duration(milliseconds: milliseconds), handleTimeout);

void handleTimeout(Timer) {
  // callback function
  print(5555);
  // Do some work.
}
