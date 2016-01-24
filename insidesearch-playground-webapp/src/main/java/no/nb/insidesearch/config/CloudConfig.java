package no.nb.insidesearch.config;

import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("cloud")
@EnableDiscoveryClient
@RefreshScope
@Component
public class CloudConfig {

}
