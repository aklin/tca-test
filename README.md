# Technical Test Submission

The UI is Creative Tim's excellent [Dashboard UI][ctui]. When evaluating the
submission please focus on the following files:

_Hooks_
* `src/hooks/cathook.ts`
* `src/hooks/thecatapi.ts`

_Components & Views_

* `src/components/*Cat*` - ie. everything with _Cat_ in the name
* `src/components/*Votes*`
* `src/views/UploadView`

## Code Layout

The code is split in two main views: The Dashboard and the Upload page.

The **Dashboard** view uses a tabbed component to focus on four areas of 
interest:

* _Browse_ - Get random cat pictures
* _My Uploads_ - See this user's uploaded pictures
* _My Favourites_ - This user's favourited pictures
* _My Votes_ - Pictures this user has voted on

The **Upload** view is a simple form, which uploads a picture to the relevant
endpoint.


## Components

The fundamental component is `CatItem`. This component accepts either
an object or an `image_id`. It displays the associated picture and renders
the action buttons for voting and setting/unsetting as _Favourite_.

Next up is `CatGrid`, responsible for displaying `CatItem`s on a four-column
grid. Unlike `CatItem`, `CatGrid` is a completely dumb component that has no API
logic of its own. Instead it relies on higher-level components passing down the
information needed.

Finally, there are four higher-level components: `FavouriteCats`, `SearchCats`, `MyCats` and
`Vote`. Each of these components will call the relevant API endpoint, and pass
any data received over to `CatGrid`, which in turn will handle the display. 


[ctui]: https://www.creative-tim.com/product/material-dashboard-react
