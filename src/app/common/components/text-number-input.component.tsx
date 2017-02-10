import * as React from 'react';

interface TextNumberInputProps {
  label: string;
  placeholder?: string;
  value: number,
  name: string,
  error?: string,
  onChange: (e: React.FormEvent) => void
}


export class TextNumberInput extends React.Component<TextNumberInputProps, {}> {

  private wrapperClass: string;

  constructor(props?: TextNumberInputProps, context?: any) {
    super(props, context);

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
            type="number"
            name={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            value={this.props.value + ''}
            onChange={this.props.onChange}
            />
          {this.props.error && <div className="alert alert-danger">{this.props.error}</div>}
        </div>
      </div>
    );
  }

}
