//
//  ctdVoucherViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdVoucherViewController.h"
#import "ctdReimbursement.h"

@interface ctdVoucherViewController ()

@end

@implementation ctdVoucherViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}

- (IBAction)didRequestClicked:(id)sender{
}

- (IBAction)didReimbursementClicked:(id)sender{
    [self goToReimbursement];
}

-(void) goToReimbursement{
    ctdReimbursement *ctdReimbursementPage = [[ctdReimbursement alloc]initWithNibName:@"ctdReimbursement" bundle:nil];
    [self.navigationController pushViewController:ctdReimbursementPage animated:YES];
}

-(void)viewWillAppear:(BOOL)animated{
    [self.navigationController setNavigationBarHidden:NO animated:YES];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
