import { InputLabelProps, SelectProps, Stack, StackProps } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { InputLabel, FormHelperText } from "../TextField/TextField";
import { ControlledField } from "../Checkbox";
import { PlainSelectField, PlainSelectFieldProps } from "./PlainSelectField";
export type SingleOption = {
    label: string
    value: string
    name: string
}

type GroupedOption = {
    groupLabel: string
    options: SingleOption[]
}

export type SelectOption = SingleOption | GroupedOption

export type BaseSelectFieldProps = Omit<
    SelectProps,
    "onChange" | "value" | "options"
> & {
    label?: string
    helperText?: string;
    containerProps?: StackProps
    labelProps?: InputLabelProps
    value?: string
    transformValue?: (value: string) => any | undefined
    getValue?: (value: any) => string;
    onChange?: (...event: any[]) => void;
}

export type SelectFieldProps<T extends boolean = false> = 
    BaseSelectFieldProps & {
        modalOptions?: T
    } & (T extends true ? PlainSelectFieldProps : PlainSelectFieldProps)

    export function SelectField<T extends boolean>({
        label,
        options,
        helperText,
        error,
        required,
        containerProps = {},
        labelProps = {},
        modalOptions,
        onChange,
        transformValue = (v: string) => v,
        getValue = (value: any) => value,
        value,
        ...rest
      }: SelectFieldProps<T>) {
        return (
          <Stack width={"100%"}>
            <Stack gap={1} {...containerProps}>
              {label && (
                <InputLabel error={error} required={required} {...labelProps}>
                  {label}
                </InputLabel>
              )}
              {/* Modal Options Condition */}
              <PlainSelectField
                error={error}
                options={options as SelectOption[]}
                onChange={(e) =>
                  onChange?.(transformValue(e.target.value) ?? e.target.value)
                }
                value={getValue(value) ?? ""}
                {...rest}
              />
              {helperText && (
                <FormHelperText error={error}>{helperText}</FormHelperText>
              )}
            </Stack>
          </Stack>
        );
      }
export type ControlledSelectFieldProps<
  T extends FieldValues,
  U extends boolean
> = ControlledField<T> & SelectFieldProps<U>;

export function ControlledSelectField<
  T extends FieldValues,
  U extends boolean
>({
  control,
  name,
  onChange: origOnChange,
  transformValue = (v: string) => v,
  shouldUnregister,
  ...rest
}: ControlledSelectFieldProps<T, U>) {
  return (
    <Controller
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <SelectField
          error={Boolean(error?.message)}
          helperText={error?.message}
          onChange={(event: any) => {
            onChange(transformValue(event) ?? event);
            origOnChange?.(event);
          }}
          onBlur={onBlur}
          inputRef={ref}
          value={value ?? ""}
          {...rest}
        />
      )}
    />
  );
}