import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

import { boxShadow } from "@/app/styles";
import { supportsHover } from "@/react-multiversal/supports";
import { UserColorScheme } from "@/react-multiversal/theme/colorScheme";
import { useFocus } from "@/react-multiversal/useFocus";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

type ColorScheme = "light" | "dark";

export const defaultSvgPaths = {
  light:
    "M14,23 C14.8149606,23 15.5,23.6629213 15.5,24.4269663 L15.5,26.5730337 C15.5,27.3483146 14.8149606,28 14,28 C13.1850394,28 12.5,27.3483146 12.5,26.5730337 L12.5,24.4269663 C12.5,23.6629213 13.1850394,23 14,23 Z M22.8019108,19.6805904 L24.3194096,21.1980892 C24.867616,21.7462956 24.8440311,22.6915028 24.267767,23.267767 C23.6915028,23.8440311 22.7462956,23.867616 22.1980892,23.3194096 L20.6805904,21.8019108 C20.1403291,21.2616494 20.1559689,20.3084972 20.732233,19.732233 C21.3084972,19.1559689 22.2616494,19.1403291 22.8019108,19.6805904 Z M7.26776695,19.732233 C7.84403114,20.3084972 7.85967094,21.2616494 7.31940958,21.8019108 L5.80191076,23.3194096 C5.25370438,23.867616 4.30849723,23.8440311 3.73223305,23.267767 C3.15596886,22.6915028 3.13238404,21.7462956 3.68059042,21.1980892 L5.19808924,19.6805904 C5.7383506,19.1403291 6.69150277,19.1559689 7.26776695,19.732233 Z M14.0062893,7 C17.8427673,7 21,10.1543986 21,14 C21,17.8456014 17.8427673,21 14.0062893,21 C10.1572327,21 7,17.8456014 7,14 C7,10.1543986 10.1572327,7 14.0062893,7 Z M26.5730337,12 C27.3370787,12 28,12.6850394 28,13.5 C28,14.3149606 27.3370787,15 26.5730337,15 L24.4269663,15 C23.6516854,15 23,14.3149606 23,13.5 C23,12.6850394 23.6516854,12 24.4269663,12 Z M3.57303371,12 C4.33707865,12 5,12.6850394 5,13.5 C5,14.3149606 4.33707865,15 3.57303371,15 L1.42696629,15 C0.651685393,15 0,14.3149606 0,13.5 C0,12.6850394 0.651685393,12 1.42696629,12 Z M24.267767,3.73223305 C24.8440311,4.30849723 24.8596709,5.2616494 24.3194096,5.80191076 L22.8019108,7.31940958 C22.2537044,7.86761596 21.3084972,7.84403114 20.732233,7.26776695 C20.1559689,6.69150277 20.132384,5.74629562 20.6805904,5.19808924 L22.1980892,3.68059042 C22.7383506,3.14032906 23.6915028,3.15596886 24.267767,3.73223305 Z M5.80191076,3.68059042 L7.31940958,5.19808924 C7.86761596,5.74629562 7.84403114,6.69150277 7.26776695,7.26776695 C6.69150277,7.84403114 5.74629562,7.86761596 5.19808924,7.31940958 L3.68059042,5.80191076 C3.14032906,5.2616494 3.15596886,4.30849723 3.73223305,3.73223305 C4.30849723,3.15596886 5.2616494,3.14032906 5.80191076,3.68059042 Z M14,0 C14.8149606,0 15.5,0.662921348 15.5,1.42696629 L15.5,3.57303371 C15.5,4.34831461 14.8149606,5 14,5 C13.1850394,5 12.5,4.34831461 12.5,3.57303371 L12.5,1.42696629 C12.5,0.662921348 13.1850394,0 14,0 Z",
  auto: "M14,23 C14.8149606,23 15.5,23.6629213 15.5,24.4269663 L15.5,26.5730337 C15.5,27.3483146 14.8149606,28 14,28 C13.1850394,28 12.5,27.3483146 12.5,26.5730337 L12.5,24.4269663 C12.5,23.6629213 13.1850394,23 14,23 Z M22.8019108,19.6805904 L24.3194096,21.1980892 C24.867616,21.7462956 24.8440311,22.6915028 24.267767,23.267767 C23.6915028,23.8440311 22.7462956,23.867616 22.1980892,23.3194096 L20.6805904,21.8019108 C20.1403291,21.2616494 20.1559689,20.3084972 20.732233,19.732233 C21.3084972,19.1559689 22.2616494,19.1403291 22.8019108,19.6805904 Z M7.26776695,19.732233 C7.84403114,20.3084972 7.85967094,21.2616494 7.31940958,21.8019108 L5.80191076,23.3194096 C5.25370438,23.867616 4.30849723,23.8440311 3.73223305,23.267767 C3.15596886,22.6915028 3.13238404,21.7462956 3.68059042,21.1980892 L5.19808924,19.6805904 C5.7383506,19.1403291 6.69150277,19.1559689 7.26776695,19.732233 Z M12.485213,7.18020985 C12.6683077,7.39258863 12.6835656,7.71115679 12.4928419,8.12832938 C12.1724262,8.79580552 11.9664446,9.81218965 11.9664446,10.7223844 C11.9664446,13.9687456 14.2246129,16.1380431 17.5813497,16.1380431 C18.4586786,16.1380431 19.2978628,15.9484192 19.9386943,15.6677758 C20.2896259,15.5084917 20.6252996,15.5388316 20.8236522,15.7208705 C21.0448917,15.9256643 21.0525206,16.2745723 20.8770548,16.7144998 C19.7708575,19.3237247 17.2227892,21 14.2322419,21 C10.028692,21 7,17.9508476 7,13.8398014 C7,10.8513286 8.83094731,8.17383911 11.4934499,7.1195302 C11.9359288,6.93749126 12.2944893,6.96783108 12.485213,7.18020985 Z M26.5730337,12 C27.3370787,12 28,12.6850394 28,13.5 C28,14.3149606 27.3370787,15 26.5730337,15 L24.4269663,15 C23.6516854,15 23,14.3149606 23,13.5 C23,12.6850394 23.6516854,12 24.4269663,12 L26.5730337,12 Z M3.57303371,12 C4.33707865,12 5,12.6850394 5,13.5 C5,14.3149606 4.33707865,15 3.57303371,15 L1.42696629,15 C0.651685393,15 0,14.3149606 0,13.5 C0,12.6850394 0.651685393,12 1.42696629,12 Z M24.267767,3.73223305 C24.8440311,4.30849723 24.8596709,5.2616494 24.3194096,5.80191076 L22.8019108,7.31940958 C22.2537044,7.86761596 21.3084972,7.84403114 20.732233,7.26776695 C20.1559689,6.69150277 20.132384,5.74629562 20.6805904,5.19808924 L22.1980892,3.68059042 C22.7383506,3.14032906 23.6915028,3.15596886 24.267767,3.73223305 Z M5.80191076,3.68059042 L7.31940958,5.19808924 C7.86761596,5.74629562 7.84403114,6.69150277 7.26776695,7.26776695 C6.69150277,7.84403114 5.74629562,7.86761596 5.19808924,7.31940958 L3.68059042,5.80191076 C3.14032906,5.2616494 3.15596886,4.30849723 3.73223305,3.73223305 C4.30849723,3.15596886 5.2616494,3.14032906 5.80191076,3.68059042 Z M14,0 C14.8149606,0 15.5,0.662921348 15.5,1.42696629 L15.5,3.57303371 C15.5,4.34831461 14.8149606,5 14,5 C13.1850394,5 12.5,4.34831461 12.5,3.57303371 L12.5,1.42696629 C12.5,0.662921348 13.1850394,0 14,0 Z",
  dark: "M14.5695359,26 C12.2013625,26 10.0650382,25.4772735 8.16056306,24.4318206 C6.25608792,23.3863677 4.75320863,21.9457829 3.65192518,20.1100664 C2.55064173,18.2743498 2,16.1628641 2,13.7756094 C2,12.112763 2.31051225,10.4993081 2.93153675,8.93524465 C3.55256126,7.37118121 4.43027589,5.99233581 5.56468064,4.79870844 C6.6990854,3.60508108 8.01979751,2.72015045 9.52681697,2.14391655 C10.0567579,1.92988681 10.4624939,1.95458255 10.744025,2.21800376 C11.0255561,2.48142497 11.0503971,2.84362914 10.8185479,3.30461626 C10.6363807,3.81499486 10.4707742,4.4817798 10.3217283,5.30497108 C10.1726824,6.12816237 10.0981595,6.89373026 10.0981595,7.60167477 C10.0981595,9.75843594 10.5328767,11.6270802 11.402311,13.2076074 C12.2717453,14.7881347 13.5096541,16.0105738 15.1160375,16.8749246 C16.7224209,17.7392754 18.6103354,18.1714509 20.7797809,18.1714509 C21.5250104,18.1714509 22.2536791,18.1014796 22.9657872,17.9615371 C23.6778953,17.8215946 24.2575182,17.6693042 24.7046558,17.5046659 C25.2014754,17.3400277 25.5699499,17.4099989 25.8100794,17.7145797 C26.0502089,18.0191605 26.0626294,18.4101763 25.8473409,18.8876273 C25.3339606,20.1882695 24.5183485,21.3818969 23.4005043,22.4685094 C22.2826602,23.5551219 20.9660883,24.4153568 19.4507885,25.0492141 C17.9354887,25.6830714 16.3084045,26 14.5695359,26 Z M21,13 C20.6846473,13 20.5020747,12.8253638 20.4522822,12.4760915 C20.3195021,11.4615385 20.1825726,10.6673597 20.0414938,10.0935551 C19.9004149,9.51975052 19.6804979,9.08731809 19.3817427,8.7962578 C19.0829876,8.50519751 18.626556,8.27234927 18.0124481,8.0977131 C17.3983402,7.92307692 16.560166,7.73596674 15.4979253,7.53638254 C15.1659751,7.5031185 15,7.32016632 15,6.98752599 C15,6.65488565 15.1659751,6.47193347 15.4979253,6.43866944 C16.560166,6.30561331 17.3941909,6.16008316 18,6.002079 C18.6058091,5.84407484 19.0580913,5.61122661 19.3568465,5.3035343 C19.6556017,4.995842 19.8755187,4.54677755 20.0165975,3.95634096 C20.1576763,3.36590437 20.3029046,2.54677755 20.4522822,1.4989605 C20.5020747,1.16632017 20.6846473,1 21,1 C21.2987552,1 21.4647303,1.17463617 21.4979253,1.52390852 C21.6639004,2.53846154 21.8174274,3.33264033 21.9585062,3.90644491 C22.0995851,4.48024948 22.3236515,4.91268191 22.6307054,5.2037422 C22.9377593,5.49480249 23.3941909,5.72349272 24,5.88981289 C24.6058091,6.05613306 25.4315353,6.23908524 26.4771784,6.43866944 C26.8257261,6.48856549 27,6.67151767 27,6.98752599 C27,7.32016632 26.8091286,7.5031185 26.4273859,7.53638254 C25.033195,7.75259875 24.0207469,7.97713098 23.3900415,8.20997921 C22.7593361,8.44282744 22.3319502,8.86694387 22.1078838,9.48232848 C21.8838174,10.0977131 21.6804979,11.0956341 21.4979253,12.4760915 C21.4647303,12.8253638 21.2987552,13 21,13 Z",
};

export const defaultThemeColors = {
  light: {
    backgroundColor: "rgb(200,200,200)",
    backgroundBorderColor: "rgb(185,185,185)",
    toggleBorderColor: "rgb(175,175,175)",
    toggleColor: "rgb(255,255,255)",
    toggleIconColor: "rgb(150,150,150)",
    inactiveIconColor: "rgb(255,255,255)",
  },
  dark: {
    backgroundColor: "rgb(20,20,20)",
    backgroundBorderColor: "rgb(10,10,10)",
    toggleBorderColor: "rgb(30,30,30)",
    toggleColor: "rgb(128,128,128)",
    toggleIconColor: "rgb(0,0,0)",
    inactiveIconColor: "rgb(100,100,100)",
  },
};
export const defaultFocusedThemeColors = {
  light: {
    backgroundColor: "rgb(0,0,0)",
    backgroundBorderColor: "rgb(0,0,0)",
    toggleBorderColor: "rgb(0,0,0)",
    toggleColor: "rgb(255,255,255)",
    toggleIconColor: "rgb(0,0,0)",
    inactiveIconColor: "rgb(255,255,255)",
  },
  dark: {
    /*
      backgroundColor: 'rgb(255,255,255)',
      backgroundBorderColor: 'rgb(0,0,0)',
      toggleBorderColor: 'rgb(0,0,0)',
      toggleColor: 'rgb(0,0,0)',
      toggleIconColor: 'rgb(255,255,255)',
      inactiveIconColor: 'rgb(0,0,0)',
      */
    backgroundColor: "rgb(0,0,0)",
    backgroundBorderColor: "rgb(0,0,0)",
    toggleBorderColor: "rgb(0,0,0)",
    toggleColor: "rgb(255,255,255)",
    toggleIconColor: "rgb(0,0,0)",
    inactiveIconColor: "rgb(255,255,255)",
  },
};

type ColorSchemeToggleThemeColors = {
  backgroundColor: string;
  backgroundBorderColor: string;
  toggleColor: string;
  toggleIconColor: string;
  toggleBorderColor: string;
  inactiveIconColor: string;
};

type ColorSchemeToggleTheme = {
  light: ColorSchemeToggleThemeColors;
  dark: ColorSchemeToggleThemeColors;
};

const useAnimatedIconStyle = (
  iconValue: UserColorScheme,
  value: UserColorScheme,
  inactiveIconSize: number,
  iconSize: number,
  iconSpringOptions: WithSpringConfig
) =>
  useAnimatedStyle(() => {
    const isActive = value === iconValue;
    const isVisible =
      iconValue === "auto" ? value === "auto" : value !== "auto";
    return {
      opacity: withSpring(isVisible ? 1 : 0),
      transform: [
        {
          scale: withSpring(
            isActive ? 1 : inactiveIconSize / iconSize,
            iconSpringOptions
          ),
        },
      ],
    };
  }, [iconValue, value, inactiveIconSize, iconSize, iconSpringOptions]);

const useAnimatedColorProps = (
  iconValue: UserColorScheme,
  value: UserColorScheme,
  actualColor: SharedValue<number>,
  activeTheme: ColorSchemeToggleTheme
) =>
  useAnimatedProps(() => {
    const isActive = value === iconValue;
    return {
      color: interpolateColor(
        actualColor.get(),
        [0, 1],
        isActive
          ? [
              activeTheme.light.toggleIconColor,
              activeTheme.dark.toggleIconColor,
            ]
          : [
              activeTheme.light.inactiveIconColor,
              activeTheme.dark.inactiveIconColor,
            ]
      ),
    };
  }, [activeTheme, value, actualColor, iconValue]);

export default function ColorSchemeToggle({
  systemColorScheme,
  value: _value,
  actualValue,
  onChange,
  theme = defaultThemeColors,
  focusedTheme = defaultFocusedThemeColors,
  toggleSize = 44,
  width = toggleSize * 1.75,
  height = toggleSize * 0.9,
  borderWidth = 1,
  iconSize = 24,
  inactiveIconSize = 18,
  svgViewBox = "0 0 28 28",
  svgPaths = defaultSvgPaths,
  onHover,
  onLeave,
  onFocus,
  onBlur,
  iconSpringOptions = {
    damping: 50,
    stiffness: 300,
    mass: 0.25,
  },
}: {
  systemColorScheme: ColorScheme;
  value: UserColorScheme;
  actualValue: ColorScheme;
  onChange: (value: UserColorScheme) => void;
  theme?: ColorSchemeToggleTheme;
  focusedTheme?: ColorSchemeToggleTheme;
  toggleSize?: number;
  width?: number;
  height?: number;
  borderWidth?: number;
  iconSize?: number;
  inactiveIconSize?: number;
  svgViewBox?: string;
  svgPaths?: {
    light: string;
    dark: string;
    auto: string;
  };
  onHover?: () => void;
  onLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  iconSpringOptions?: WithSpringConfig;
}) {
  const ref = React.useRef(null);
  const [hasAnyFocus] = useFocus(ref, {
    onHover,
    onLeave,
    onFocus,
    onBlur,
  });
  const activeTheme = hasAnyFocus ? focusedTheme : theme;
  const value = supportsHover()
    ? hasAnyFocus
      ? _value
      : actualValue
    : actualValue;

  const dynamicStyles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          cursor: "pointer",
          justifyContent: "center",
          width,
          height: toggleSize,
          paddingVertical: (toggleSize - height) / 2,
          paddingHorizontal: (toggleSize - width) / 2,
        },
        background: {
          borderWidth,
          width,
          height,
          borderRadius: height,
        },
        circle: {
          position: "absolute",
          zIndex: 1,
          borderWidth,
          width: toggleSize,
          height: toggleSize,
          borderRadius: toggleSize,
          boxShadow: boxShadow.moreVisible,
        },
        icon: {
          zIndex: 2,
          position: "absolute",
          padding: (toggleSize - iconSize) / 2,
        },
      }),
    [toggleSize, width, height, borderWidth, iconSize]
  );

  const position = useSharedValue(
    value === "light" ? 0 : value === "auto" ? 1 : 2
  );
  const actualColor = useSharedValue(actualValue === "light" ? 0 : 1);

  React.useEffect(() => {
    position.set(withSpring(value === "light" ? 0 : value === "auto" ? 1 : 2));
    actualColor.set(withSpring(actualValue === "light" ? 0 : 1));
  }, [value, actualValue, actualColor, position]);

  const handleToggle = React.useCallback(() => {
    const nextValue =
      // we loop from the opposite system color scheme to avoid unecessary click
      systemColorScheme === "light"
        ? value === "light"
          ? "auto"
          : value === "auto"
            ? "dark"
            : "light"
        : value === "dark"
          ? "auto"
          : value === "auto"
            ? "light"
            : "dark";
    onChange(nextValue);
  }, [onChange, systemColorScheme, value]);

  const animatedBackgroundStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        actualColor.get(),
        [0, 1],
        [activeTheme.light.backgroundColor, activeTheme.dark.backgroundColor]
      ),
      borderColor: interpolateColor(
        actualColor.get(),
        [0, 1],
        [
          activeTheme.light.backgroundBorderColor,
          activeTheme.dark.backgroundBorderColor,
        ]
      ),
    }),
    [activeTheme, actualColor]
  );

  const animatedCircleStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: position.get() * ((width - toggleSize) / 2) }],
      backgroundColor: interpolateColor(
        actualColor.get(),
        [0, 1],
        [activeTheme.light.toggleColor, activeTheme.dark.toggleColor]
      ),
      borderColor: interpolateColor(
        actualColor.get(),
        [0, 1],
        [
          activeTheme.light.toggleBorderColor,
          activeTheme.dark.toggleBorderColor,
        ]
      ),
    }),
    [activeTheme, actualColor, position, toggleSize, width]
  );

  const animatedIconStyleLight = useAnimatedIconStyle(
    "light",
    value,
    inactiveIconSize,
    iconSize,
    iconSpringOptions
  );
  const animatedIconStyleDark = useAnimatedIconStyle(
    "dark",
    value,
    inactiveIconSize,
    iconSize,
    iconSpringOptions
  );
  const animatedIconStyleAuto = useAnimatedIconStyle(
    "auto",
    value,
    inactiveIconSize,
    iconSize,
    iconSpringOptions
  );
  const animatedColorPropsLight = useAnimatedColorProps(
    "light",
    value,
    actualColor,
    activeTheme
  );
  const animatedColorPropsDark = useAnimatedColorProps(
    "dark",
    value,
    actualColor,
    activeTheme
  );
  const animatedColorPropsAuto = useAnimatedColorProps(
    "auto",
    value,
    actualColor,
    activeTheme
  );

  return (
    <Pressable ref={ref} onPress={handleToggle}>
      <Animated.View style={dynamicStyles.container}>
        <Animated.View
          style={[dynamicStyles.background, animatedBackgroundStyle]}
        />
        <Animated.View
          style={[
            dynamicStyles.icon,
            { alignSelf: "flex-start" },
            animatedIconStyleLight,
          ]}
        >
          <AnimatedSvg
            width={iconSize}
            height={iconSize}
            viewBox={svgViewBox}
            animatedProps={animatedColorPropsLight}
          >
            <Path fill="currentColor" d={svgPaths.light} />
          </AnimatedSvg>
        </Animated.View>
        <Animated.View
          style={[
            dynamicStyles.icon,
            { alignSelf: "center" },
            animatedIconStyleAuto,
          ]}
        >
          <AnimatedSvg
            width={iconSize}
            height={iconSize}
            viewBox={svgViewBox}
            animatedProps={animatedColorPropsAuto}
          >
            <Path fill="currentColor" d={svgPaths.auto} />
          </AnimatedSvg>
        </Animated.View>
        <Animated.View
          style={[
            dynamicStyles.icon,
            { alignSelf: "flex-end" },
            animatedIconStyleDark,
          ]}
        >
          <AnimatedSvg
            width={iconSize}
            height={iconSize}
            viewBox={svgViewBox}
            animatedProps={animatedColorPropsDark}
          >
            <Path fill="currentColor" d={svgPaths.dark} />
          </AnimatedSvg>
        </Animated.View>
        <Animated.View style={[dynamicStyles.circle, animatedCircleStyle]} />
      </Animated.View>
    </Pressable>
  );
}

/*
const App = () => {
  const [theme, setTheme] = React.useState<'light' | 'auto' | 'dark'>('dark');
  const colorScheme = useColorScheme();
  const actualValue =
    theme === 'auto' ? (colorScheme === 'dark' ? 'dark' : 'light') : theme;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: actualValue === 'dark' ? '#222' : '#fff',
      }}>
      <ColorSchemeToggle
        value={theme}
        actualValue={actualValue}
        onChange={setTheme}
        theme={themeColors}
        focusedTheme={focusedThemeColors}
      />
    </View>
  );
};
*/
