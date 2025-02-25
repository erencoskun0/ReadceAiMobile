export function getGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return 'Günaydın!';
  } else if (currentHour < 18) {
    return 'İyi günler!';
  } else if (currentHour < 22) {
    return 'İyi akşamlar!';
  } else {
    return 'İyi geceler!';
  }
}
