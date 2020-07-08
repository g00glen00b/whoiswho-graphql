import React from 'react';
import SourceSelect from 'react-select';
import {useTheme} from 'emotion-theming';

export const Select = ({...props}) => {
  const applicationTheme = useTheme();
  return (
    <SourceSelect
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
