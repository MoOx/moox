import * as React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { useTheme } from "@/app/styles";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import SVGChevronRight from "@/svgs/components/SVGChevronRight";

const avatarSize = size("xxl");

type BotResponse = string[];

const botResponses: BotResponse[] = [
  [
    "Hello, I’m BotMax. Max is a front-end developer, so he didn’t really build me to be a smart assistant.",
    "If you ask me anything, I’ll just tell you to click on the links above.",
  ],
  [
    "I’m not a real chatbot, I just display pre-written messages.",
    "So if you want to reach Max, just find a link above that works for you!",
  ],
  [
    "Seriously, I’m dumb. I don’t understand what you’re saying.",
    "I just keep showing you new messages, no matter what you type.",
  ],
  [
    "See? I told you I wasn’t smart. Even the loading delay is fake.",
    "To reach Max, you have plenty of options above.",
  ],
  [
    "I hope you get it now—I’m just a fake bot.",
    "Maybe you should contact Max directly instead?",
    "He’s much smarter than me! Links are above!",
  ],
  ["Ok I guess you got it. That's my last message, you should reach Max now."],
];

type Message = {
  id: string;
  text: string;
  isBot: boolean;
  groupId?: string;
  isFullyDisplayed?: boolean;
};

function MessageBubble({
  message,
  onComplete,
}: {
  message: Message;
  onComplete: () => void;
}) {
  const theme = useTheme();
  const { text, isFullyDisplayed, isBot } = message;
  const shouldAnimate = isBot;
  const [displayedText, setDisplayedText] = React.useState(
    shouldAnimate ? "" : text
  );
  const words = React.useMemo(() => text.split(" "), [text]);
  const currentWordIndex = React.useRef(-1);

  React.useEffect(() => {
    if (isFullyDisplayed) {
      return;
    }
    const timer = setInterval(() => {
      if (currentWordIndex.current < words.length - 1) {
        currentWordIndex.current += 1;
        setDisplayedText(
          (prev) => prev + (prev ? " " : "") + words[currentWordIndex.current]
        );
      } else {
        clearInterval(timer);
        onComplete();
      }
    }, 80);

    return () => clearInterval(timer);
  }, [words, onComplete, text, isFullyDisplayed]);

  return (
    <SpacedView
      horizontal="s"
      vertical="xxs"
      style={[
        isBot ? theme.styles.backAlt : theme.styles.backMain,
        { borderRadius: size("s") },
      ]}
    >
      <Text
        style={[
          fontStyles.ios.callout,
          isBot ? theme.styles.textDark : theme.styles.textOnMain,
        ]}
      >
        {displayedText}
      </Text>
    </SpacedView>
  );
}

const MessageFragment = ({
  message,
  index,
  length,
  handleMessageComplete,
}: {
  message: Message;
  index: number;
  length: number;
  handleMessageComplete: (messageId: string) => void;
}) => {
  const handleMsgComplete = React.useCallback(
    () => handleMessageComplete(message.id),
    [handleMessageComplete, message.id]
  );
  return (
    <>
      <MessageBubble message={message} onComplete={handleMsgComplete} />
      {index !== length - 1 ? <Spacer size="xs" /> : null}
    </>
  );
};

function AnimatedDot({ index }: { index: number }) {
  const theme = useTheme();
  const progress = useSharedValue(0);
  const height = 2;
  const dotDuration = 500;
  const pauseDuration = 600;
  const overlap = 0.6;
  const singleDotSpacing = dotDuration * (1 - overlap);
  const cycleDuration = 3 * singleDotSpacing + pauseDuration;

  React.useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const cyclePosition = (now % cycleDuration) / cycleDuration;
      const dotStart = (index * singleDotSpacing) / cycleDuration;
      const dotEnd = dotStart + dotDuration / cycleDuration;

      if (cyclePosition >= dotStart && cyclePosition < dotEnd) {
        const dotProgress =
          (cyclePosition - dotStart) / (dotDuration / cycleDuration);
        // Main wave for the basic up/down movement
        const mainWave = Math.sin(dotProgress * Math.PI);
        // Secondary wave that creates a slight overshoot at the end
        const bounceWave = Math.sin(dotProgress * Math.PI * 2);
        // Combine waves with a slight negative value at the end
        progress.value =
          mainWave +
          (mainWave > 0.5 ? bounceWave * 0.2 : 0) -
          (mainWave < 0.2 ? 0.2 : 0);
      } else {
        progress.value = 0;
      }

      requestAnimationFrame(animate);
    };
    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [cycleDuration, dotDuration, singleDotSpacing, index, progress]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: 0.5 + Math.abs(progress.value) * 0.5,
      transform: [
        {
          translateY: progress.value * -height,
        },
      ],
    }),
    [progress]
  );

  return (
    <Animated.View
      style={[
        {
          width: 6,
          height: 6,
          borderRadius: 6,
          backgroundColor: theme.dynamicColors.textOnMain,
          marginHorizontal: 2,
        },
        animatedStyle,
      ]}
    />
  );
}

function TypingIndicator() {
  const theme = useTheme();
  const dots = [0, 1, 2];

  return (
    <SpacedView
      horizontal="s"
      vertical="s"
      style={[
        theme.styles.backMain,
        {
          borderRadius: size("s"),
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
        },
      ]}
    >
      {dots.map((i) => (
        <AnimatedDot key={i} index={i} />
      ))}
    </SpacedView>
  );
}

export default function ChatBot() {
  const theme = useTheme();
  const [isTyping, setIsTyping] = React.useState(true);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [currentResponseIndex, setCurrentResponseIndex] = React.useState(0);

  React.useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: "1",
            text: botResponses[0]![0] ?? "",
            isBot: true,
            groupId: "initial",
            isFullyDisplayed: false,
          },
          {
            id: "2",
            text: botResponses[0]![1] ?? "",
            isBot: true,
            groupId: "initial",
            isFullyDisplayed: false,
          },
        ]);
        setCurrentResponseIndex(1);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const handleMessageComplete = React.useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isFullyDisplayed: true } : msg
      )
    );
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      {
        id: Date.now().toString(),
        text: inputValue,
        isBot: false,
        isFullyDisplayed: true,
      },
    ];

    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (
        currentResponseIndex < botResponses.length &&
        botResponses[currentResponseIndex]
      ) {
        const groupId = Date.now().toString();
        const botMessages = botResponses[currentResponseIndex].map(
          (response) => ({
            id: Date.now().toString() + Math.random(),
            text: response,
            isBot: true,
            groupId,
            isFullyDisplayed: false,
          })
        );
        setMessages((prev) => [...prev, ...botMessages]);
        setCurrentResponseIndex((prev) => prev + 1);
      }
    }, 3000);
  };

  const renderMessages = () => {
    const messageGroups: Message[][] = [];
    let currentGroup: Message[] = [];

    messages.forEach((message, index) => {
      if (index === 0 || messages[index - 1]?.isBot !== message.isBot) {
        if (currentGroup.length > 0) {
          messageGroups.push(currentGroup);
        }
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });
    if (currentGroup.length > 0) {
      messageGroups.push(currentGroup);
    }

    return (
      <>
        {messageGroups.map((group) => {
          const isBot = group[0]?.isBot;
          const lastDisplayedIndex = group.findIndex(
            (msg) => !msg.isFullyDisplayed
          );
          const visibleMessages =
            lastDisplayedIndex === -1
              ? group
              : group.slice(0, lastDisplayedIndex + 1);

          return (
            <React.Fragment key={group[0]?.id}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: isBot ? "flex-start" : "flex-end",
                }}
              >
                {isBot && (
                  <>
                    <Image
                      alt=""
                      source={{ uri: "/botmax.svg" }}
                      style={{ width: avatarSize, height: avatarSize }}
                    />
                    <Spacer size="s" />
                  </>
                )}
                <View
                  style={{
                    alignItems: isBot ? "flex-start" : "flex-end",
                    flexShrink: 1,
                  }}
                >
                  {isBot && (
                    <>
                      <Text
                        style={[
                          fontStyles.ios.footnote,
                          theme.styles.textLight1,
                        ]}
                      >
                        {"BotMax"}
                      </Text>
                      <Spacer size="xxs" />
                    </>
                  )}
                  {visibleMessages.map((message, index) => (
                    <MessageFragment
                      key={index}
                      message={message}
                      index={index}
                      length={visibleMessages.length}
                      handleMessageComplete={handleMessageComplete}
                    />
                  ))}
                </View>
              </View>
              <Spacer size="s" />
            </React.Fragment>
          );
        })}
        {isTyping && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <Image
              alt=""
              source={{ uri: "/botmax.svg" }}
              style={{ width: avatarSize, height: avatarSize }}
            />
            <Spacer size="s" />
            <View>
              <Text style={[fontStyles.ios.footnote, theme.styles.textLight1]}>
                {"BotMax"}
              </Text>
              <Spacer size="xxs" />
              <TypingIndicator />
            </View>
          </View>
        )}
      </>
    );
  };

  return (
    <SpacedView horizontal="l" vertical="m">
      {renderMessages()}
      <Spacer size="s" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          paddingLeft: size("s") + avatarSize,
        }}
      >
        <TextInput
          placeholder="Message..."
          placeholderTextColor={theme.dynamicColors.textLight2}
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleSend}
          style={{
            paddingVertical: size("s"),
            paddingLeft: size("s"),
            paddingRight: size("xl"),
            borderRadius: size("xs"),
            flex: 1,
            borderWidth: 1,
            borderColor: theme.dynamicColors.backAlt,
            backgroundColor: theme.dynamicColors.backOnAlt,
            fontSize: size("m"),
            fontFamily: fontStyles.ios.body.fontFamily,
            color: theme.dynamicColors.text,
          }}
        />
        <Pressable
          onPress={handleSend}
          style={{
            position: "absolute",
            bottom: size("xs"),
            right: size("xs"),
            backgroundColor: theme.dynamicColors.backMain,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SpacedView horizontal="xs" vertical="xs">
            <SVGChevronRight
              width={size("s")}
              height={size("s")}
              fill={theme.dynamicColors.textOnMain}
              style={{ transform: [{ rotate: "-90deg" }] }}
            />
          </SpacedView>
        </Pressable>
      </View>
    </SpacedView>
  );
}
