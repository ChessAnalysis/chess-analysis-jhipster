package inria.diverse.chessanalysis.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import inria.diverse.chessanalysis.security.AuthoritiesConstants;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;

/**
 * Service.
 */
@RestController
@RequestMapping("/api/service")
public class ServiceResource {

    @RequestMapping(value = "/getMdFiles",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @RolesAllowed(AuthoritiesConstants.ADMIN)
    public List<String> findAll() {
    	String[] tab = new File("./src/main/webapp/assets/resources/").list();
    	List<String> list = new ArrayList<String>();
    	for(int i = 0; i < tab.length; i++) {
    		if(tab[i].contains(".md")) {
    			list.add("/assets/resources/" + tab[i]);
    		}
    	}
        return list;
    }

}
