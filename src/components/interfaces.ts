export interface MheaderProps {
  title: string;
}

export interface MnavbarProps {
  theme: 'light' | 'dark';
  page: string;
}

export interface FavoriteBtnProps {
  userInfo: any;
  templateId: string;
  updateUserFunc: any;
  requestSignInFunc?: any;
}

export interface TemplateCardProps {
  info: any;
  userInfo: any;
  updateUserFunc: any;
}

export interface UserInfo {
  // To be generalized
}

export interface ListStyleConfig {
  display: string;
  listStyleType: string;
  paddingInlineStart: string;
  marginBottom: string;
  lineHeight: string;
}

export interface TemplateConfig {
  regularFont: string;
  regularFontSize: number;
  regularFontWeight: string;
  boldFontWeight: string;
  headingFont: string;
  headingFontSize: number;
  // ADVANCED SETTINGS
  backgroundColor: string;
  linkColor: string;
  headingColor: string;
  textColor: string;
  pageHeight: number;
  pageWidth: number;
  verticalMargin: Number;
  horizontalMargin: Number;
  listConfig: ListStyleConfig;
  userInfo: any;
}

export interface ConfigInputsProps {
  config: TemplateConfig;
  updateConfig: Function;
  templateId: string;
}

export interface DirectEditBtnProps {
  templateEdit: boolean;
  setTemplateEdit: Function;
}