export default function _navigate(name) {
  if (name === 'Profile') {
    this.props.navigator.resetTo({
      name: 'Profile'
    });
  }
  if (name === 'Map') {
    this.props.navigator.resetTo({
      name: 'Map'
    });
  }
  if (name === 'Feed') {
    this.props.navigator.resetTo({
      name: 'Feed'
    });
  }
  if (name === 'Invites') {
    this.props.navigator.resetTo({
      name: 'Invites'
    });
  }
  if (name === 'Saved') {
    this.props.navigator.resetTo({
      name: 'Saved'
    });
  }
};
