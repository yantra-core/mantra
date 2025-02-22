let exampleRoot = 'https://yantra.gg/mantra/examples';

export default class Playground {
  static id = 'world-playground';
  static type = 'world'; // type is optional for Plugins
  constructor() {
    this.id = Playground.id;
  }

  async preload(game) {

    game.use('Button')
    game.use('Code')
    game.use('Container')
    game.use('Editor')
    game.use('Hexapod')
    game.use('Iframe')
    game.use('Image')
    game.use('Link')
    game.use('Platform')
    game.use('Player')
    game.use('Select')
    game.use('Teleporter')
    game.use('Text')

  }

  init(game) {
    this.game = game;

    game.config.defaultMouseMovement = false;
    // Movements with right click, switch default left-click-to-move behavior
    game.config.mouseMovementButton = 'RIGHT';
    // Actions with left click
    game.config.mouseActionButton = 'LEFT';
    // enables the default top-down mouse movements
    game.config.defaultMouseMovement = true;

    game.data.camera.scaleMultiplier = 0.5;
   

    game.reset();

    document.body.style.overflow = 'auto';
    document.body.style.position = 'relative';

    game.data.camera.mode = 'none';

    // Remark: Not ideal for mapping Mouse buttons, 
    // as they should be conditionals in Sutra tree like Keyboard events are
    let mouse = game.systems.mouse;
    //mouse.setButtonMapping('LEFT', 1);
    //mouse.setButtonMapping('MIDDLE', 0);
    // enables mouse wheel zoom
    game.data.camera.mouseWheelZoomEnabled = false;

    this.createWorld();
    this.setDefaultZoom();

  }

  createWorld() {
    let game = this.game;
    let currentUrl = null;

    let text = game.make().Text()
      .text('Mantra.js Alpha Playground')
      .style({
        fontSize: '64px',
      })
      .color('white')
      .width(900)
      .position(50, -520, 0)
      //.layout('top-center')
      //.offset(0, 60)
      //.origin('top-left')
      .createEntity();

    // alert(text.position.x + ' ' + text.position.y)

    let link = game.make()
      .Link({
        href: 'https://yantra.gg/mantra/examples/items/boomerang',
        target: '_blank'
      })
      .style({
        fontSize: '32px',
        color: 'purple',
      })
      .text('/examples/items/boomerang')
      .width(600)
      .height(20)
      .x(-100)
      .y(-440)
      .createEntity();

    let sideTextGroup = game.make().name('side-text-group').style({
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    }).position(-800, -400).createEntity();

    let introText = game.make().Text().text('Select from the drop downs');
    introText.color('white');
    introText.position(280, 10);
    introText.width(200);
    introText.style({
      fontSize: '64px',
      textAlign: 'right', // Not working? CSS style seems applied in DOM, Text() might be better as child span element
    })
    introText.container('side-text-group');
    introText.createEntity();

    let src = 'https://yantra.gg/mantra/img/game/env/github-link-256.png';

    // Remark: These image links could also be buttons with textures, or ents with in-line textures
    let githubImageLink = game.make()
      .Image({
        alt: 'Mantra.js Github',
        src: src
      })
      .pointerdown(function (context, event) {
        // opens new link to Mantra.js Github
        event.preventDefault();
        let link = 'https://github.com/yantra-core/Mantra.js';
        if (game.isTouchDevice()) {
        window.location = link;
        } else {
          window.open(link, '_blank');
        }
      })
      .style({
        cursor: 'pointer'
      })
      .position(-700, 150)
      .size(128)
      .createEntity();

    let discordImageLink = game.make()
      .Image({
        alt: 'AYYO Discord',
        src: 'https://yantra.gg/mantra/img/game/env/discord-voice-dark.png'
      })
      .pointerdown(function (context, event) {
        let link = 'https://discord.gg/ZyNxBVmFgV';
        if (game.isTouchDevice()) {
          window.location = link;
        } else {
          // opens new link to AYYO Discord
          window.open(link, '_blank');
        }
      })
      .style({
        cursor: 'pointer'
      })
      .position(-500, 150)
      .size(128)
      .createEntity();

    game.make()
      .Container({
        layout: 'grid',
        grid: {
          columns: 7,
          rows: 3
        }
      })
      .color(0xff00ff)
      .name('container-a')
      .width(1960)
      .height(400)
      .position(170, 450, -1)
      .style({
        //padding: 0,
        margin: 0,
        paddingLeft: 0,
        paddingTop: 0,
        // background: '#ff0000', // can also use Entity.color
        border: {
          color: '#000000',
          width: 0
        }
      })
      .createEntity();

    let primaryGameEmbed = game.make()
      .Iframe({ src: 'https://yantra.gg/mantra/examples/demo?source=items/boomerang' })
      // .Iframe({ src: 'http://192.168.1.80:7777/examples/demo.html?source=games/gravity-gardens' })
      .width(800)
      .height(600)
      .x(0)
      .y(-100)
      .createEntity();

    let evalEmbed = game.make()
      .Iframe({ src: 'https://yantra.gg/mantra/eval' })
      //.Iframe({ src: 'http://192.168.1.80:7777/eval.html' })
      .name('eval-embed')
      .width(800)
      .height(600)
      .x(primaryGameEmbed.position.x)
      .y(primaryGameEmbed.position.y)
      .style({
        display: 'none'
      })
      .createEntity();

    // Creates a <code> element with the given source
    // Allows for remote code sources
    let codeEditor = game.make()
      .Code({
        //  code: 'hello <h1>'
        src: 'https://yantra.gg/mantra/examples/items/boomerang.js'
        //src: 'http://192.168.1.80:8888/items/boomerang.js'
      })
      .name('code-editor')
      .height(700)
      .width(660)
      .x(800)
      .y(-170)
      .z(33)
      .createEntity();


    // TODO: use EntityBuilder.origin() property ( WIP )
    let origin = {     // top-right origin
      x: codeEditor.position.x - codeEditor.size.width / 2,
      y: codeEditor.position.y + codeEditor.size.height / 2
    };

    origin.x += 100;
    origin.y += 38;

    game.on('iframeMessage', function (event) {
      console.log('iframeMessage', event)
      game.flashText(event.data.message)
    });


    let evalRunButton = game.make()
      .Button({ text: 'Run Code' })
      .width(200)
      .height(40)
      .position(origin.x, origin.y, 32)
      .pointerdown(function (context, event) {

        // Get the <iframe> element reference
        let evalEmbed = game.getEntityByName('eval-embed');
        let graphic = evalEmbed.graphics['graphics-css'];
        let evalIframe = graphic.querySelectorAll('iframe')[0];

        // sets the evalRunButton to disabled
        /*
        game.updateEntity(evalRunButton.id, {
          style: {
            display: 'none'
          }
        });
        */

        // hides the primaryGameEmbed
        game.updateEntity(evalEmbed.id, {
          style: {
            display: 'block'
          }
        });

        // Get the <code> from the code editor
        let codeEditor = game.getEntityByName('code-editor');
        let graphic2 = codeEditor.graphics['graphics-css'];
        let textarea = graphic2.querySelectorAll('textarea')[0];
        let source;

        source = textarea.value;
        // Add a one-time event listener for the iframe's load event
        evalIframe.onload = function () {
          // Send the code to the iframe
          console.log('onload', source)
          // alert('post message')
          evalIframe.contentWindow.postMessage({
            code: source
          }, '*'); // Consider specifying the iframe's origin instead of '*'
        }

        // Reload the evalIframe from it's src to clear state
        evalIframe.src = evalIframe.src;

        // hides the primaryGameEmbed
        game.updateEntity(primaryGameEmbed.id, {
          meta: {
            src: null
          },
          style: {
            display: 'none'
          }
        });
        primaryGameEmbed.src = null;

      })
      .createEntity();


    let player = game.make().Player();
    player.position(evalRunButton.position.x + 60, evalRunButton.position.y + 5, 0).z(64);
    player.createEntity();

    let hexapods = game.make().Hexapod().position(-800, -800).repeat(6).createEntity();

    // Function to create a dropdown select with given options and append it to a specified container
    function createDropdown(primaryGameEmbed, options, containerId, dropdownTitle) {

      let optionsFormatted = options.map(item => ({
        label: item.title.replace('<br/>', ''), // <-- legacy examples API can remove soon
        value: exampleRoot + '/demo.html?source=' + item.url.replace('.html', '') // Concatenate the root path with the example URL
      }));

      // first options is the label
      optionsFormatted.unshift({
        label: dropdownTitle + '...',
        value: ''
      });
      // Create the select dropdown
      let dropdownSelect = game.make().Select({
        options: optionsFormatted,
        title: dropdownTitle // Optional: Use title for labeling or categorizing the dropdown
      }).container(containerId);

      // Function to handle after an option is selected and update the entity accordingly
      // TODO: add EntityBuilder.onchange event
      dropdownSelect.afterUpdateEntity(function (context, event) {

        if (!context || typeof context.value === 'undefined') {
          return;
        }

        if (currentUrl === context.value) return;
        console.log('afterUpdateEntity', primaryGameEmbed, context.value, event);

        if (typeof primaryGameEmbed === 'undefined') {
          return;
        }

        if (typeof context.value === 'undefined' || context.value === '' || context.value === null) {
          // do not process invalid selections ( such as the first option which is empty )
          return;
        }

        //
        // Set all the other dropdowns to the first option
        //

        //
        // Since the Playground is built using CSSGraphics, we can use the DOM to reset the dropdowns
        // This wouldn't be considered "best practice", however it will work fine for now until we have
        // implemented non-bubbling onchange event handling in the ECS with tests
        let currentSelect = context.graphics['graphics-css'].querySelectorAll('select')[0];
        let selectElements = document.querySelectorAll('select');
        selectElements.forEach(select => {
          if (select !== currentSelect) {
            select.value = '';
          }
        });

        // Remark: In order to do this through the ECS, we'd have to implement a non-bubbling update event,
        // tests would need to be written first, this type of update action is self-ref and cascade.
        // we also would be much better off using `onchange` event support instead of `afterUpdateEntity` for this
        /*
        let dropdowns = game.getEntitiesByType('SELECT');
        dropdowns.forEach(dropdown => {
          game.updateEntity(dropdown.id, {
            value: ''
          });
        });
        */


        //
        // Updates the IFrame src to the selected example
        //
        game.updateEntity(primaryGameEmbed.id, {
          meta: {
            src: context.value
          }
        });

        //
        // Updates the Code src to the selected example
        //
        let sourceLink = context.value.replace('demo.html?source=', '') + '.js';
        console.log('sourceLink', sourceLink)
        // alert(sourceLink)
        game.updateEntity(codeEditor.id, {
          meta: {
            src: sourceLink
          }
        });

        //
        // Updates the Examples link to the selected example link
        //
        let textLink = sourceLink.replace('https://yantra.gg/mantra', '').replace('.js', '');
        let exampleLink = sourceLink.replace('.js', '');
        game.updateEntity(link.id, {
          text: textLink,
          meta: {
            href: exampleLink
          }
        });

        // hides the evalEmbed

        // hides the primaryGameEmbed
        game.updateEntity(evalEmbed.id, {
          style: {
            display: 'none'
          }
        });

        // show the primaryGameEmbed
        game.updateEntity(primaryGameEmbed.id, {
          style: {
            display: 'block'
          }
        });

      });

      // Set style and dimensions for the dropdown
      dropdownSelect.width(230).height(80).style({
        fontSize: '32px',
        backgroundColor: categories.find(cat => cat.title === dropdownTitle)?.color || '#e0e0e0' // Use category color if available
      }).createEntity();
    }
    categories.forEach(category => {
      // Filter examples based on whether 'example.category' is an array or a string
      let categoryExamples = examples.filter(example => {
        if (Array.isArray(example.category)) {
          // If 'example.category' is an array, check if it includes the current 'category.name'
          return example.category.includes(category.name);
        } else {
          // If 'example.category' is a string, perform direct comparison
          return example.category === category.name;
        }
      });

      // Create a dropdown for the current category with its examples
      createDropdown(primaryGameEmbed, categoryExamples, 'container-a', category.title); // Assume 'container-a' exists or is dynamically created for each category
    });


    // TODO: injects examples into playground scene itself
    // let addSceneButton = game.make().Button({ text: 'Load Example as Scene', disabled: true }).width(250).position(650, 500).createEntity();
    // TODO: save current scene as world on Yantra
    // let deployToYantraButton = game.make().Button({ text: 'Deploy to Yantra.gg' }).width(200).position(900, 500).createEntity();
    // TODO: copies code to clipboard
    // let copyCodeButton = game.make().Button({ text: 'Copy Code' }).width(200).position(1000, 500).createEntity();
    // TODO: changes gravity on the entire playground page
    // let gravitySlider = game.make().Range().width(100).position(-540, -400, 0).createEntity();

    let docsEmbed = game.make().width(768).height(1000);
    docsEmbed.Iframe({ src: 'https://yantra.gg/mantra/examples' })
    docsEmbed.style({
      border: 'none',
    })
    docsEmbed.x(0).y(1200);
    docsEmbed.createEntity();


    /*
    let text_dragToMoveMap = game.make().Text().text('Drag to move map');
    text_dragToMoveMap.x(200);
    text_dragToMoveMap.y(220);
    text_dragToMoveMap.width(600);
    text_dragToMoveMap.color('white');
    text_dragToMoveMap.style({
      fontSize: '24px',
    })
    text_dragToMoveMap.createEntity();
    */

    /*
    let text_wheelToZoom = game.make().Text().text('Wheel to Zoom');
    text_wheelToZoom.x(0);
    text_wheelToZoom.y(220);
    text_wheelToZoom.width(600);
    text_wheelToZoom.color('white');
    text_wheelToZoom.style({
      fontSize: '24px',
    })
    text_wheelToZoom.createEntity();
    */

    /*
    let text_clickToInteract = game.make().Text().text('Click to interact');
    text_clickToInteract.x(220);
    text_clickToInteract.y(220);
    text_clickToInteract.width(170);
    //text_clickToInteract.height(40);
    text_clickToInteract.color('white');
    text_clickToInteract.style({
      fontSize: '24px',
      cursor: 'pointer'
    })
    text_clickToInteract.pointerup((context, event) => {
      event.preventDefault();
      // game.rotate(context.id, 0.1);
      this.game.shakeCamera({});
    });
    text_clickToInteract.createEntity();
    */

    // TODO code responsive layout for mobile
    /*
    if (screenWidth < 400) {
      // move the code editor to same x as embed
      // move embed up
      game.updateEntity(codeEditor.id, {
        x: primaryGameEmbed.position.x,
        y: primaryGameEmbed.position.y - 800
      })
    }
    */

  }

  setDefaultZoom () {

    let game = this.game;

    //
    // Caclulate the zoom based on the width and height of the window
    // Remark: We could put this into Mantra as a utility function with parameters
    //
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    // Width-based zoom calculation
    let zoomRatioWidth = 0.5 / game.width; // Derived ratio for width
    let baseWidth = game.width;
    let baseZoomWidth = 0.5;
    let zoomWidth = baseZoomWidth + (screenWidth - baseWidth) * zoomRatioWidth;

    // Height-based zoom calculation (assuming similar ratios and base values for height)
    let zoomRatioHeight = 0.5 / game.height; // You might need to adjust this based on your game's height scaling
    let baseHeight = game.height; // Adjust this base height as per your requirements
    let baseZoomHeight = 0.5;
    let zoomHeight = baseZoomHeight + (screenHeight - baseHeight) * zoomRatioHeight;

    // Choose the smaller zoom level to ensure content fits both width and height
    let zoom = Math.min(zoomWidth, zoomHeight);

    // Clamp the zoom level between 0.4 and 1
    zoom = Math.max(0.4, Math.min(zoom, 1));

    //
    // Calls game.setZoom with the calculated zoom level
    //
    game.setZoom(zoom);
    
  }

}

//let entities = text2Entities(text);
function text2Entities(text) {
  let entities = [];
  let lines = text.split('');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let x = 0 + i * 32;
    let y = -200;
    let entity = game.make().Text({ text: line }).x(x).y(y).body(true).createEntity();
    entities.push(entity);
  }
  return entities;
}