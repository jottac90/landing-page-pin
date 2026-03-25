// INICIALIZAÇÃO DO F7 QUANDO DISPOSITIVO ESTÁ PRONTO
document.addEventListener('deviceready', onDeviceReady, false);
var $$ = Dom7;

/** Rotas: home no index.html (pageName); restantes em paginas/ */
var ROUTES = [
  { path: '/home-pincreator/', pageName: 'home_pincreator' },
  { path: '/index/', pageName: 'home_pincreator' },
  { path: '/home-pincreator-mobile/', url: 'paginas/home_pincreator_mobile.html' },
  { path: '/contacto-pincreator/', url: 'paginas/contacto_pincreator.html' },
  { path: '/contacto-mobile/', url: 'paginas/contacto_mobile.html' },
  { path: '/obsidian-violet/', url: 'paginas/obsidian_violet.html' },
  { path: '/portfolio-galeria/', url: 'paginas/portf_lio_galeria.html' },
  { path: '/portfolio-mobile/', url: 'paginas/portf_lio_mobile.html' },
  { path: '/sobre-servicos/', url: 'paginas/sobre_servi_os.html' },
  { path: '/sobre-servicos-mobile/', url: 'paginas/sobre_servi_os_mobile.html' },
];

function routeHandlers() {
  return {
    pageBeforeIn: function () {},
    pageAfterIn: function () {},
    pageInit: function () {},
    pageBeforeRemove: function () {},
  };
}

var app = new Framework7({
  el: '#app',
  name: 'PINCREATOR',
  id: 'com.pincreator.app',
  panel: { swipe: true },
  dialog: {
    buttonOk: 'Sim',
    buttonCancel: 'Cancelar',
  },
  routes: ROUTES.map(function (r) {
    var entry = { path: r.path, on: routeHandlers() };
    if (r.pageName) entry.pageName = r.pageName;
    if (r.url) entry.url = r.url;
    return entry;
  }),
});

var mainView;

function getOrCreateMainView() {
  if (!mainView) {
    var el = document.querySelector('.view-main');
    if (el && el.f7View) {
      mainView = el.f7View;
    } else {
      mainView = app.views.create('.view-main', { url: '/home-pincreator/' });
    }
  }
  return mainView;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    getOrCreateMainView();
  });
} else {
  getOrCreateMainView();
}

app.on('routeChange', function (route) {
  var currentRoute = route.path || route.url || '';
  document.querySelectorAll('.item-panel').forEach(function (el) {
    el.classList.remove('active');
  });
  var targetEl =
    document.querySelector('.item-panel[href="' + currentRoute + '"]') ||
    document.querySelector('.item-panel[href="' + route.url + '"]');
  if (targetEl) {
    targetEl.classList.add('active');
  }
});

function isHomeRoute(path) {
  return path === '/home-pincreator/' || path === '/home-pincreator-mobile/' || path === '/index/';
}

function onDeviceReady() {
  var mv = getOrCreateMainView();
  document.addEventListener(
    'backbutton',
    function (e) {
      if (isHomeRoute(mv.router.currentRoute.path)) {
        e.preventDefault();
        app.dialog.confirm('Deseja sair do aplicativo?', function () {
          navigator.app.exitApp();
        });
      } else {
        e.preventDefault();
        mv.router.back({ force: true });
      }
    },
    false
  );
}
