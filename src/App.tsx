import React from 'react';

type Color = string;

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string | number;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
  colors: Color[];
}

const params = [
  {
    id: 1,
    name: 'Назначение',
    type: 'text',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'text',
  },
];

const model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
    { paramId: 3, value: 3 },
  ],
  colors: [],
};

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      paramValues: this.props.model.paramValues,
      colors: this.props.model.colors,
    };
  }

  handleChange = (paramId: number, value: string) => {
    const paramValues = this.state.paramValues.map((paramValue) => {
      if (paramValue.paramId === paramId) {
        return { ...paramValue, value: value };
      }
      return paramValue;
    });

    this.setState({ paramValues });
    console.log(this.getModel());
  };

  getModel = (): Model => {
    return {
      paramValues: this.state.paramValues,
      colors: this.props.model.colors,
    };
  };

  getInputType(val: string): string {
    if (val === 'number') return 'number';
    return 'text';
  }

  render() {
    const { params } = this.props;

    return (
      <div
        style={{
          width: '50%',
          margin: '0 auto',
        }}
      >
        {params.map((param) => (
          <div
            key={param.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            <label>{param.name}</label>
            <input
              type={this.getInputType(param.type)}
              value={
                this.state.paramValues.find(
                  (paramValue) => paramValue.paramId === param.id
                )?.value || ''
              }
              onChange={(e) => this.handleChange(param.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }
}

function App() {
  return (
    <main>
      <ParamEditor
        params={params}
        model={model}
      />
    </main>
  );
}

export default App;
