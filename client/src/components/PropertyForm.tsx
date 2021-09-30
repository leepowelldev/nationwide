import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import type { FieldProps } from 'formik';
import type { FC, ReactElement, VFC } from 'react';
import type { PropertyInput, PropertyTypes } from '../types';

type Props = {
  cancelButtonText?: string;
  cancelButtonIcon?: ReactElement;
  saveButtonText?: string;
  saveButtonIcon?: ReactElement;
  defaultAddress?: string;
  defaultType?: PropertyTypes;
  defaultBedrooms?: number;
  onCancel?: () => void;
  onSubmit?: (data: PropertyInput) => void;
  disabled?: boolean;
};

type Values = {
  address: string;
  type: PropertyTypes;
  bedrooms: number;
};

type FieldComponent = VFC<{ readOnly?: boolean }>;

const noop = () => undefined;

const validationSchema = yup.object().shape({
  address: yup.string().min(10, 'Minimum 10 characters').required('Required'),
  type: yup.mixed().oneOf(['HOUSE', 'BUNGALOW', 'FLAT']).required('Required'),
  bedrooms: yup
    .number()
    .min(1, 'Minimum 1 bedroom')
    .max(10, 'Maximum 10 bedrooms 💰')
    .required('Required'),
});

const PropertyForm: VFC<Props> = ({
  cancelButtonText = 'Cancel',
  cancelButtonIcon,
  saveButtonText = 'Save',
  saveButtonIcon,
  defaultAddress = '',
  defaultType = 'HOUSE',
  defaultBedrooms = 1,
  onCancel = noop,
  onSubmit = noop,
  disabled = false,
}) => {
  const handleSubmit = (values: Values) => {
    onSubmit(values);
  };

  const initialValues: Values = {
    address: defaultAddress,
    type: defaultType,
    bedrooms: defaultBedrooms,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form noValidate>
        <AddressField readOnly={disabled} />
        <div className="sm:flex sm:justify-between">
          <TypeField readOnly={disabled} />
          <BedroomsField readOnly={disabled} />
        </div>
        <FormControls
          cancelButtonIcon={cancelButtonIcon}
          cancelButtonText={cancelButtonText}
          disabled={disabled}
          onCancel={onCancel}
          saveButtonIcon={saveButtonIcon}
          saveButtonText={saveButtonText}
        />
      </Form>
    </Formik>
  );
};

const ErrorMessageContainer: FC<JSX.IntrinsicElements['div']> = ({
  children,
  ...props
}) => {
  return (
    <div {...props} className="mt-2 text-red-800 ">
      {children}
    </div>
  );
};

const FormControls: VFC<
  Pick<
    Props,
    | 'disabled'
    | 'onCancel'
    | 'cancelButtonIcon'
    | 'cancelButtonText'
    | 'saveButtonIcon'
    | 'saveButtonText'
  >
> = ({
  disabled,
  onCancel,
  cancelButtonIcon,
  cancelButtonText,
  saveButtonIcon,
  saveButtonText,
}) => {
  return (
    <div className="form-controls">
      <div>
        <Button
          disabled={disabled}
          fullWidth
          onClick={onCancel}
          startIcon={cancelButtonIcon}
          variant="contained"
        >
          {cancelButtonText}
        </Button>
      </div>
      <div className="mt-3 sm:mt-0">
        <Button
          color="success"
          disabled={disabled}
          fullWidth
          startIcon={saveButtonIcon}
          type="submit"
          variant="contained"
        >
          {saveButtonText}
        </Button>
      </div>
    </div>
  );
};

const AddressField: FieldComponent = ({ readOnly = false }) => {
  return (
    <div className="form-field">
      <Field name="address">
        {({ field }: FieldProps) => (
          <TextField
            fullWidth
            id="address"
            inputProps={{
              readOnly,
              'aria-errormessage': 'address-error',
            }}
            label="Address"
            required
            variant="standard"
            {...field}
          />
        )}
      </Field>

      <ErrorMessageContainer id="address-error">
        <ErrorMessage name="address" />
      </ErrorMessageContainer>
    </div>
  );
};

const TypeField: FieldComponent = ({ readOnly = false }) => {
  return (
    <div className="form-field form-field--half form-field--first">
      <Field name="type">
        {({ field }: FieldProps) => (
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="type" id="type-label">
              Type
            </InputLabel>
            <Select<PropertyTypes>
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              autoWidth
              id="type"
              inputProps={{
                readOnly,
                'aria-errormessage': 'type-error',
              }}
              label="Type"
              labelId="type-label"
              required
              {...field}
            >
              <MenuItem value="HOUSE">House</MenuItem>
              <MenuItem value="BUNGALOW">Bungalow</MenuItem>
              <MenuItem value="FLAT">Flat</MenuItem>
            </Select>
          </FormControl>
        )}
      </Field>
      <ErrorMessageContainer id="type-error">
        <ErrorMessage name="type" />
      </ErrorMessageContainer>
    </div>
  );
};

const BedroomsField: FieldComponent = ({ readOnly }) => {
  return (
    <div className="form-field form-field--half form-field--last">
      <Field name="bedrooms">
        {({ field }: FieldProps) => (
          <TextField
            fullWidth
            id="bedrooms"
            inputProps={{
              readOnly,
              'aria-errormessage': 'bedrooms-error',
              min: 1,
              max: 20,
            }}
            label="Bedrooms"
            required
            type="number"
            variant="standard"
            {...field}
          />
        )}
      </Field>
      <ErrorMessageContainer id="bedrooms-error">
        <ErrorMessage name="bedrooms" />
      </ErrorMessageContainer>
    </div>
  );
};

export { PropertyForm };
export type { Props as PropertyFormProps };
