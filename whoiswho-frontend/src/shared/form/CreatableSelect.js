import React from 'react';
import SourceCreatableSelect from 'react-select/creatable';
import {useTheme} from 'emotion-theming';

export const CreatableSelect = ({...props}) => {
  const applicationTheme = useTheme();
  return (
    <SourceCreatableSelect
      {...props}
      styles={{
        placeholder: styles => ({
          ...styles,
          textTransform: 'uppercase'
        }),
        multiValueLabel: styles => ({
          ...styles,
          color: applicationTheme.secondaryTextColor,
          textTransform: 'uppercase'
        }),
        multiValueRemove: styles => ({
          ...styles,
          color: applicationTheme.secondaryTextColor
        })
      }}
      theme={theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: applicationTheme.primaryColor,
          primary25: applicationTheme.primaryColorLight,
          danger: applicationTheme.secondaryTextColor,
          dangerLight: applicationTheme.dangerColor,
          neutral0: applicationTheme.backgroundColorDarker,
          neutral10: applicationTheme.primaryColor,
          neutral20: applicationTheme.backgroundColorDarker,
          neutral30: applicationTheme.backgroundColorDarker,
          neutral50: applicationTheme.textColorLighter,
          neutral80: applicationTheme.textColor
        }
      })}/>
  );
}
