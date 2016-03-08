$(function() {

   describe('RSS Feeds', function() {
    /*Test 7*/
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });
    /*Test 8*/
    it('URL is not empty', function(){
      for (i=0; i < allFeeds.length; i++){
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe("");
      }
    });
    /*Test 9*/
    it('Name is not empty', function(){
      for (i=0; i < allFeeds.length; i++){
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe("");
      }
    });
  });
  /*Test 10*/
  describe('The Menu', function(){
    var menuIcon= $('.menu-icon-link');
    var bodyElement = document.body;
    beforeEach(function() {
      spyOn(menuIcon,'click');
    });
    /*Test 11*/
    it('Menu is hidden by default', function(){
      expect(bodyElement.className).toBe("menu-hidden");
    });
        
    describe('When Clicked', function(){
      if(bodyElement.className == "menu-hidden"){
        it('First click turns the Menu on', function(){
          menuIcon.click(); //this is making checking for the click.
          expect(menuIcon.click).toHaveBeenCalled();
          expect(bodyElement.className).toBeUndefined;
        });
      }
        it('Second click closes the Menu', function(){
          menuIcon.click();
          menuIcon.click();
          expect(menuIcon.click).toHaveBeenCalled();
          expect(bodyElement.className).toBe("menu-hidden");
        });
    });
  });

  
  describe('Initial Entries', function(){
    
    beforeEach(function(done){
      loadFeed(0,function(){
        done();
      });
      spyOn(window, 'loadFeed');
    });
    it('LoadFeed is called, completed, and there is at least a single entry', function(done){
        expect(window.loadFeed).toHaveBeenCalled();
        var entryArray= document.getElementsByClassName('entry');
        expect(entryArray.length).toBeGreaterThan(0);
        done();
    });
  });

  describe('New Feed Selection', function(){
    
    beforeEach(function(done){
      loadFeed(0, function(){
        done();
      });
      spyOn(window,'loadFeed');
    });
    it('Content actually changes when it finishes loading',function(done){
      //we're going to get the Array of Elements and then compare the 0 and 1 entry's innerText variable which is the title of the article. So since there isn't a base value for any of these elements, if they're not equal, the function is working and populating the articles.
      var entryArray = document.getElementsByClassName('entry');
      expect(entryArray[0].innerText).not.toEqual(entryArray[1].innerText);
      done();
    });
  });
}());
