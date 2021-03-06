<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\PageBundle\Controller;

use FOS\RestBundle\Context\Context;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Hateoas\Representation\CollectionRepresentation;
use Sulu\Bundle\PageBundle\Admin\PageAdmin;
use Sulu\Component\Rest\RequestParametersTrait;
use Sulu\Component\Rest\RestController;
use Sulu\Component\Security\Authorization\PermissionTypes;
use Sulu\Component\Security\Authorization\SecurityCondition;
use Sulu\Component\Security\SecuredControllerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Provides webspace rest-endpoint.
 */
class WebspaceController extends RestController implements ClassResourceInterface, SecuredControllerInterface
{
    use RequestParametersTrait;

    /**
     * Returns webspaces.
     *
     * @return Response
     */
    public function cgetAction(Request $request)
    {
        $checkForPermissions = $request->get('checkForPermissions', true);
        $locale = $this->getRequestParameter($request, 'locale', true);
        $webspaces = [];

        $securityChecker = $this->get('sulu_security.security_checker');
        foreach ($this->get('sulu_core.webspace.webspace_manager')->getWebspaceCollection() as $webspace) {
            if ($checkForPermissions) {
                $securityContext = $this->getSecurityContextByWebspace($webspace->getKey());
                if (!$securityChecker->hasPermission(new SecurityCondition($securityContext), PermissionTypes::VIEW)) {
                    continue;
                }
            }

            $webspaces[] = $webspace;
        }

        $context = new Context();
        $context->setAttribute('locale', $locale);
        $view = $this->view(new CollectionRepresentation($webspaces, 'webspaces'));
        $view->setContext($context);

        return $this->handleView($view);
    }

    /**
     * Returns webspace config by key.
     *
     * @param string $webspaceKey
     *
     * @return Response
     */
    public function getAction($webspaceKey)
    {
        return $this->handleView(
            $this->view($this->get('sulu_core.webspace.webspace_manager')->findWebspaceByKey($webspaceKey))
        );
    }

    /**
     * {@inheritdoc}
     */
    public function getSecurityContext()
    {
        $request = $this->container->get('request_stack')->getCurrentRequest();
        $webspaceKey = $request->get('webspaceKey');

        if (null !== $webspaceKey) {
            return $this->getSecurityContextByWebspace($webspaceKey);
        }

        return;
    }

    /**
     * Returns security-context by webspace.
     *
     * @param string $webspaceKey
     *
     * @return string
     */
    private function getSecurityContextByWebspace($webspaceKey)
    {
        return PageAdmin::SECURITY_CONTEXT_PREFIX . $webspaceKey;
    }
}
