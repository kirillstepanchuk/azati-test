import React from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

const LanguageAutocomplete = ({
  languages,
  currentLanguage,
  setLanguage,
  loading,
}) => {
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
      onChange={(event, newValue) => {
        setLanguage(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
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
