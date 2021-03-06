package com.board.controller;

import com.board.service.IndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class IndexController {

    @Autowired
    private IndexService indexService;

    int count = 0;

    //메인창
    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("display", "page.jsp");
        return "index";
    }

    //@RequestParam(value = "str", required = false, defaultValue = "0")
    @RequestMapping(value = "/init", method = RequestMethod.POST)
    @ResponseBody
    public int initiateServer(@RequestParam String init_data) {

        System.out.println("init_data : " + init_data);
        return indexService.initiateServer();
    }

    @RequestMapping(value = "page", method = RequestMethod.GET)
    @ResponseBody
    public void page(Model model) {
        model.addAttribute("display", "/page initiated");
        System.out.println("page : " + model.getAttribute("display"));
    }
}

