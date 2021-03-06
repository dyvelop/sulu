<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\SearchBundle\Admin;

use Sulu\Bundle\AdminBundle\Admin\Admin;
use Sulu\Bundle\AdminBundle\Admin\Routing\Route;
use Sulu\Bundle\AdminBundle\Navigation\Navigation;
use Sulu\Bundle\AdminBundle\Navigation\NavigationItem;

class SearchAdmin extends Admin
{
    const SEARCH_ROUTE = 'sulu_search.search';

    public function getNavigation(): Navigation
    {
        $rootNavigationItem = $this->getNavigationItemRoot();

        $search = new NavigationItem('sulu_search.search');
        $search->setPosition(0);
        $search->setIcon('su-search');
        $search->setMainRoute(static::SEARCH_ROUTE);

        $rootNavigationItem->addChild($search);

        return new Navigation($rootNavigationItem);
    }

    public function getRoutes(): array
    {
        return [
            (new Route(static::SEARCH_ROUTE, '/', 'sulu_search.search')),
        ];
    }
}
