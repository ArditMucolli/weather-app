import cold from "../assets/images/cold.jpg";
import normal from "../assets/images/normal.jpg";
import sunny from "../assets/images/sunny.jpg";

export default function loadBackgroundImage(temp) {
  if (temp < 10) {
    return cold;
  } else if (temp > 10 && temp < 25) {
    return normal;
  } else if (temp > 25) {
    return sunny;
  }
}
