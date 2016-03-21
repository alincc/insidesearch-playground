package no.nb.insidesearch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import no.nb.metrics.annotation.EnableMetrics;

@SpringBootApplication
@EnableConfigurationProperties
@EnableDiscoveryClient
@EnableMetrics
public class InsidesearchPlaygroundApplication {

	public static void main(String[] args) {
		SpringApplication.run(InsidesearchPlaygroundApplication.class, args);
	}
}
