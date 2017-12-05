// I'm going to be linking to this file from any html file that wants to use a component (or whatever, class) from this file. Maybe I could have these react (jsx) files organized by purpose. Each component, scene or service (a feature) has everything it needs to work on its own, such as its own styles, images, translations, set of actions as well as unit or integration tests. You can see a feature like an independent piece of code you will use in your app (a bit like node modules). So i guess this means id make folders for each jsx file which would also have any supporting files it might need such as styles, data files, or images, etc right there in the file.


class EvanFooter extends React.Component {
  render() {
    return( <footer> 2016 TGIF | All rights reserved - (gen'd by react) </footer> );
  }
}


ReactDOM.render(  
        <EvanFooter />, document.getElementById('my-footer-id')
);
