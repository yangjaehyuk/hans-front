import styled from 'styled-components';
import { typographyMap } from './type';
import { colors } from '../../../constants/colors';

export const TextBox = styled.span(
  ({ color = colors.black900, textAlign, fontWeight, bold, cursor }) => ({
    color: colors[color],
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
    cursor,
  }),
  ({ typography = 'body1' }) => typographyMap[typography],
);
