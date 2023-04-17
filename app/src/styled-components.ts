import styled from "styled-components";

// Branded text wrapper imported by Google fonts in App.tsx
// Can inherit this to be customized/overwrite default values for different use cases
// For example:
// export const StyledBrandText = styled(BrandText)`
//   font-size: 8px;
//   font-weight: 700;
//   color: #000;
// `;
export const BrandText = styled.div`
  font-family: "Open Sans";
  font-style: normal;
  font-size: 14px;
  line-height: 19px;
  color: #a8192e;
`;
