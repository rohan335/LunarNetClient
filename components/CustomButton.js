import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

TouchableOpacity.defaultProps = { activeOpacity: 0.9 };

export const AppButton = ({onPress, title, backgroundColor, marginTop, marginBottom, width, height, color, borderRadius, borderColor, fontSize, borderWidth, alignSelf, alignContent, paddingLeft, padding, fontFamily, borderBottomLeftRadius, borderTopLeftRadius}) => (
  <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, backgroundColor && {backgroundColor}, marginTop && {marginTop}, marginBottom && {marginBottom}, width && {width}, height && {height}, borderRadius && {borderRadius}, borderColor && {borderColor}, borderWidth && {borderWidth}, alignContent && {alignContent}, padding && {padding}, borderTopLeftRadius && {borderTopLeftRadius}, borderBottomLeftRadius && {borderBottomLeftRadius}]} >
    <Text style={[styles.buttonText, color && {color}, color && {color}, alignSelf && {alignSelf}, paddingLeft && {paddingLeft}, fontFamily && {fontFamily}, fontSize && {fontSize}]}>{title}</Text>
  </TouchableOpacity>
);

export const AppTextButton = ({onPress, title, marginTop, marginBottom, fontSize, color, marginLeft, textDecorationLine}) => (
  <TouchableOpacity onPress={onPress} style={[styles.textButtonContainer, marginTop && {marginTop}, marginBottom && {marginBottom}, marginLeft && {marginLeft}]} >
    <Text style={[styles.buttonTextText, fontSize && {fontSize}, color && {color}, textDecorationLine && {textDecorationLine}]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 14,
        elevation: 8,
        alignSelf: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        fontFamily: "UbuntuR",
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center',
      },
      textButtonContainer: {
        alignSelf: 'center'
      },
      buttonTextText: {
        fontFamily: "UbuntuR",
        fontSize: 18,
        color: '#000',
      },
}) 