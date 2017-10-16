import * as React from 'react';

export class ITextInputProps {
  label: string;
  placeholder?: string;
  name: string;
  error?: string;
  onChange: (e: React.FormEvent<{}>) => void;
}

class TextInputProps extends ITextInputProps {
  value: string;
}


export class TextInput extends React.Component<TextInputProps, { }> {

  private wrapperClass: string;

  constructor(props?: TextInputProps, context?: any) {
    super(props, context);

    this.state = { value: this.props.value };

    this.wrapperClass = 'form-group';


    if (this.props.error && this.props.error.length > 0) {
      this.wrapperClass += ' has-error';
    }
  }
  render() {

    return (
      <div className={this.wrapperClass}>
        {this.props.label && <label htmlFor={this.props.name}>{this.props.label}</label>}
        <div className="field">
          <input
            type="text"
            name={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={(e) => this.props.onChange(e)}
          />
          {this.props.error && <div className="alert alert-danger">{this.props.error}</div>}
        </div>
      </div>
    );
  }

}
