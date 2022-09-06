import React from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

const LanguageAutocomplete = ({
  languages,
  currentLanguage,
  setLanguage,
  loading,
}) => {
  const onAutocompleteValueChange = (event, newValue) => {
    setLanguage(newValue);
  };

  return (
    <Autocomplete
      style={{
        width: "100%",
      }}
      disablePortal
      disableClearable
      isOptionEqualToValue={(option, value) => option.label === value}
      loading={loading}
      options={languages}
      value={currentLanguage}
      onChange={onAutocompleteValueChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Language"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default LanguageAutocomplete;
