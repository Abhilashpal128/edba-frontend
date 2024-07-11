import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useThemeContext } from "../../../hooks/useTheme";
// import { theme } from "../../../theming";

const CustomTextArea = ({
  value,
  onChangeText,
  placeholder,
  numberOfLines = 3,
  lineLength = 20, // Adjust this as needed for your use case
}) => {
  // State to manage input values for each line
  const { theme } = useThemeContext();
  const [inputValues, setInputValues] = useState(Array(numberOfLines).fill(""));

  // Array to store refs for each TextInput
  const refs = useRef(inputValues.map(() => React.createRef()));

  const handleTextChange = (text, index) => {
    // Prevent entering text in the next line if the previous line is not filled
    if (index > 0 && inputValues[index - 1].length === 0) {
      refs.current[index - 1].current.focus();
      return;
    }

    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);

    // Join the array into a single string and call onChangeText
    if (onChangeText) {
      onChangeText(newInputValues.join(" "));
    }

    // Move to the next line if the current line is filled and there are more lines
    if (text.length >= lineLength && index < numberOfLines - 1) {
      refs.current[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      {inputValues.map((text, index) => (
        <View key={index} style={styles.line}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={(text) => handleTextChange(text, index)}
            placeholder={index === 0 ? placeholder : ""}
            multiline
            placeholderTextColor={`${theme.secondaryTextColor}`}
            autoFocus={index === 0} // Autofocus on the first TextInput
            onSubmitEditing={() => {}}
            blurOnSubmit={false} // Prevents default behavior of dismissing keyboard on submit
            ref={refs.current[index]} // Assign ref to the current TextInput
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  input: {
    fontSize: 12,
    height: 30, // Adjust height as needed
  },
});

export default CustomTextArea;
