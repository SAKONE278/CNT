import Base from './Base';
import Group from './Group';
import Group2 from './Group2';
import People from './People';

function Content({ type, setType, setOpen }) {
  switch (type) {
    case 'people':
      return <People type={type} setType={setType} setOpen={setOpen} />;
    case 'group':
      return <Group type={type} setType={setType} />;
    case 'group2':
      return <Group2 type={type} setType={setType} />;
    default:
      return <Base type={type} setType={setType} />;
  }
}

export default Content;
