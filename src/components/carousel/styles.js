import { Dimensions, StyleSheet, Platform } from "react-native";
import {
  TEXT_WHITE_COLOR,
  PRIMARY_DARK_COLOR,
  PRIMARY_BLUE_ACCENT_COLOR,
} from "../../constant.js";

const imageSize = 155;
const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    position: "absolute",
    top: 79,
    left: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: TEXT_WHITE_COLOR,
  },
  description: {
    position: "absolute",
    top: 123,
    left: 16,
    fontSize: 12,
    color: TEXT_WHITE_COLOR,
  },
  item: {
    width: "100%",
    height: imageSize + 12,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 26,
    height: imageSize,
    marginBottom: 12,
    shadowColor: PRIMARY_DARK_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
    borderRadius: 26,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    marginHorizontal: 8,
    transitionTimingFunction: "ease-out",
  },
  activeDot: {
    width: 24,
    borderRadius: 100,
    backgroundColor: PRIMARY_BLUE_ACCENT_COLOR,
  },
  inactiveDot: {
    backgroundColor: `rgba(18, 205, 217, 0.5)`,
  },
});
export default styles;
